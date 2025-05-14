import mongoose, { Document, Schema } from 'mongoose';

export interface Game extends Document {
  name: string;
  platform: string;
  rating: number;
  price: number;
  imgs: string[];
  isActive: boolean;
  genre: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

const GameSchema: Schema = new Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  imgs: [{ type: String }],
  isActive: { type: Boolean, default: true },
  genre: { type: String, required: true },
  featured: { type: Boolean, default: false },
  description: { type: String, required: false }
}, {
  timestamps: true
});

export default mongoose.model<Game>('Game', GameSchema); 