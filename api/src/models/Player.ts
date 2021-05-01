import { model, Schema, Document } from 'mongoose';

export interface PlayerType extends Document {
	gameId: string;
	address: string;
	nickname: string;
	score: number;
}

const PlayerSchema = new Schema(
	{
		gameId: {
			type: Schema.Types.ObjectId,
			ref: 'Game',
			required: true
		},
		address: {
			type: String,
			required: true
		},
		nickname: {
			type: String,
			required: true
		},
		score: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

PlayerSchema.index({ gameId: 1, address: 1 }, { unique: true });

export const Player = model<PlayerType>('Player', PlayerSchema);
