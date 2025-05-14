import mongoose, { Document, Schema } from 'mongoose';

export interface GameType {
  name: string;
  formattedName: string;
  platform: string;
  rating: number;
  price: number;
  imgs: string[];
  isActive: boolean;
  genre?: string;
  featured: boolean;
  description?: string;
}

export interface Game extends Document, GameType {}

const GameSchema: Schema = new Schema({
  name: { type: String, required: true },
  formattedName: { type: String, required: true },
  platform: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  imgs: [{ type: String }],
  isActive: { type: Boolean, default: true, required: true },
  genre: { type: String, required: false },
  featured: { type: Boolean, default: false, required: true },
  description: { type: String, required: false }
}, {
  timestamps: true
});

export default mongoose.model<Game>('Game', GameSchema); 