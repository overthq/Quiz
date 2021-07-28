import { model, Schema, Document } from 'mongoose';

interface GameType extends Document {
	host: string;
	contract: string;
	stake: string;
}

const GameSchema = new Schema(
	{
		host: {
			type: String,
			required: true
		},
		contract: {
			type: String,
			unique: true
		},
		stake: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

GameSchema.index({ host: 1, contract: 1 }, { unique: true });

export const Game = model<GameType>('Game', GameSchema);
