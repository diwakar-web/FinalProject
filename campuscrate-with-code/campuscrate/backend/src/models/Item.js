import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  photoUrl: { type: String },
  status: { type: String, enum: ['active', 'claimed', 'returned'], default: 'active' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  claimQuestion: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

itemSchema.index({ title: 'text', description: 'text', tags: 1 });

export default mongoose.model('Item', itemSchema);
