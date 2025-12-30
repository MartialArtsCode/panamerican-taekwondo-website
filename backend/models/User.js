import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  rank: {
    type: String,
    default: 'Beginner',
  },
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
  }],
  achievements: [{
    type: String,
  }],
  role: {
    type: String,
    default: 'student',
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
