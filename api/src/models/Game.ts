import { model, Document, Schema } from "mongoose";

enum GameStatus {
  Funding,
  Started,
  Ended,
}

interface GameType extends Document {
  creator: string;
  winner?: string;
  contract: string;
  status: GameStatus;
}

const GameSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
      unique: true,
    },
    winner: {
      type: String,
    },
    contract: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Funding", "Started", "Ended"],
      default: "Funding",
    },
  },
  { timestamps: true }
);

export const Game = model<GameType>("Game", GameSchema);
