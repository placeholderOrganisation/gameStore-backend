import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  name: string;
  platform: string;
  rating: number;
  price: number;
  imgs: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  genre: string;
}

const GameSchema: Schema = new Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  imgs: [{ type: String }],
  isActive: { type: Boolean, default: true },
  genre: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IGame>('Game', GameSchema); 