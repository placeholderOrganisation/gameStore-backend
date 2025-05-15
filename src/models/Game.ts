import mongoose, { Document, Schema } from "mongoose";

type ImageObject = {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
  image_tags: string;
};

export interface GameType {
  name: string;
  formattedName: string;
  platform: string;
  rating: number;
  price: number;
  imgs: ImageObject;
  isActive: boolean;
  genre?: string;
  featured: boolean;
  description?: string;
}

export interface Game extends Document, GameType {}

const GameSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    formattedName: { type: String, required: true },
    platform: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    imgs: { type: Object, required: true },
    isActive: { type: Boolean, default: true, required: true },
    genre: { type: String, required: false },
    featured: { type: Boolean, default: false, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

// Create a compound unique index on name and platform
GameSchema.index({ name: 1, platform: 1 }, { unique: true });

export default mongoose.model<Game>("Game", GameSchema);
