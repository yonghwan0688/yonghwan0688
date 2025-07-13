// 💬 댓글 관련 라우트
const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { CommentMemoryDB, UserMemoryDB } = require('../data/memoryDB');

const router = express.Router();

// 🔄 댓글 수정
router.put('/:id', [
  auth,
  body('content')
    .isLength({ min: 1, max: 1000 })
    .withMessage('댓글은 1-1000글자 사이여야 합니다')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: '입력값이 올바르지 않습니다',
        errors: errors.array()
      });
    }

    const commentId = req.params.id;
    const { content } = req.body;

    // 댓글 존재 확인
    const comment = CommentMemoryDB.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: '댓글을 찾을 수 없습니다'
      });
    }

    // 작성자 확인
    if (comment.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: '댓글 수정 권한이 없습니다'
      });
    }

    // 댓글 수정
    const updatedComment = CommentMemoryDB.findByIdAndUpdate(commentId, {
      content: content
    });

    res.json({
      success: true,
      message: '댓글이 수정되었습니다',
      data: updatedComment
    });

  } catch (error) {
    console.error('댓글 수정 에러:', error);
    res.status(500).json({
      success: false,
      message: '댓글 수정에 실패했습니다'
    });
  }
});

// 🗑️ 댓글 삭제
router.delete('/:id', auth, async (req, res) => {
  try {
    const commentId = req.params.id;

    // 댓글 존재 확인
    const comment = CommentMemoryDB.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: '댓글을 찾을 수 없습니다'
      });
    }

    // 작성자 확인
    if (comment.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: '댓글 삭제 권한이 없습니다'
      });
    }

    // 댓글 삭제
    CommentMemoryDB.findByIdAndDelete(commentId);

    res.json({
      success: true,
      message: '댓글이 삭제되었습니다'
    });

  } catch (error) {
    console.error('댓글 삭제 에러:', error);
    res.status(500).json({
      success: false,
      message: '댓글 삭제에 실패했습니다'
    });
  }
});

module.exports = router;
