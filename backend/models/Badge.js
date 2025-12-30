import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  iconUrl: String,
});

export default mongoose.model('Badge', badgeSchema);
