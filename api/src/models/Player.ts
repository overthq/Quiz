import { model, Document, Schema } from 'mongoose';

interface PlayerType extends Document {
	address: string;
	nickname: string;
	gameId: string;
	round: number;
	score: number;
}

const PlayerSchema = new Schema(
	{
		address: {
			type: String,
			required: true
		},
		nickname: {
			type: String,
			required: true
		},
		gameId: {
			type: Schema.Types.ObjectId,
			ref: 'Game',
			required: true
		},
		score: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

PlayerSchema.index({ address: 1, gameId: 1 }, { unique: true });

export const Player = model<PlayerType>('Player', PlayerSchema);
