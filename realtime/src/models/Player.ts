import { model, Schema, Document } from 'mongoose';

interface PlayerType extends Document {
	gameId: string;
	address: string;
	nickname: string;
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
			required: true,
			unique: true
		},
		score: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

export const Player = model<PlayerType>('Player', PlayerSchema);
