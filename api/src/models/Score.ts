import { model, Document, Schema } from "mongoose";

interface ScoreType extends Document {
  owner: string;
  gameId: string;
  score: number;
}

const ScoreSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ScoreSchema.index({ owner: 1, gameId: 1 }, { unique: true });

export const Score = model<ScoreType>("Score", ScoreSchema);
