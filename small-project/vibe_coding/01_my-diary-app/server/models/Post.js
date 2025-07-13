// 📝 블로그 포스트 모델
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '제목은 필수입니다'],
    trim: true,
    minlength: [1, '제목은 최소 1글자 이상이어야 합니다'],
    maxlength: [100, '제목은 최대 100글자까지 가능합니다']
  },
  content: {
    type: String,
    required: [true, '내용은 필수입니다'],
    minlength: [10, '내용은 최소 10글자 이상이어야 합니다']
  },
  summary: {
    type: String,
    maxlength: [200, '요약은 최대 200글자까지 가능합니다']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, '태그는 최대 20글자까지 가능합니다']
  }],
  category: {
    type: String,
    default: 'general',
    enum: ['general', 'tech', 'life', 'travel', 'food', 'hobby']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [500, '댓글은 최대 500글자까지 가능합니다']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// 인덱스 설정 (검색 성능 향상)
PostSchema.index({ title: 'text', content: 'text', tags: 'text' });
PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ category: 1 });

// 가상 필드: 좋아요 개수
PostSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// 가상 필드: 댓글 개수
PostSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

// JSON 변환 시 가상 필드 포함
PostSchema.set('toJSON', { virtuals: true });

// 포스트 조회 시 조회수 증가 메서드
PostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('Post', PostSchema);
