import { model, Schema, Document } from 'mongoose';

interface GameType extends Document {
	address: string;
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

export const Game = model<GameType>('Game', GameSchema);
