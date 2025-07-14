// 👤 사용자 모델
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '사용자명은 필수입니다'],
    unique: true,
    trim: true,
    minlength: [3, '사용자명은 최소 3글자 이상이어야 합니다'],
    maxlength: [20, '사용자명은 최대 20글자까지 가능합니다']
  },
  email: {
    type: String,
    required: [true, '이메일은 필수입니다'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '올바른 이메일 형식이 아닙니다']
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다'],
    minlength: [6, '비밀번호는 최소 6글자 이상이어야 합니다']
  },
  profile: {
    bio: {
      type: String,
      maxlength: [500, '소개는 최대 500글자까지 가능합니다']
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // createdAt, updatedAt 자동 생성
});

// 비밀번호 해싱 미들웨어
UserSchema.pre('save', async function(next) {
  // 비밀번호가 변경되지 않았으면 다음으로
  if (!this.isModified('password')) return next();
  
  try {
    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 비밀번호 검증 메서드
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// JSON 변환 시 비밀번호 제외
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', UserSchema);
