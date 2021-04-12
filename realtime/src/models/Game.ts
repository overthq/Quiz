import { model, Schema, Document } from 'mongoose';

interface GameType extends Document {
	address: string;
	contract?: string;
}

const GameSchema = new Schema(
	{
		host: {
			type: String,
			required: true,
			unique: true
		},
		contract: {
			type: String,
			unique: true
		}
	},
	{ timestamps: true }
);

export const Game = model<GameType>('Game', GameSchema);
