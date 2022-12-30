import { model, ObjectId, Schema, Types } from 'mongoose';

export type PartialSong = {
    name?: string;
    file?: string;
    image?: string;
    genre?: string;
    artist?: Types.ObjectId;
    reproductions?: number;
};

export type Song = {
    id: Types.ObjectId;
    name: string;
    file: string;
    image: string;
    genre: string;
    artist: ObjectId;
    reproductions: number;
};

export const songSchema = new Schema<Song>({
    name: {
        type: String,
        required: true,
    },
    file: String,
    image: String,
    genre: String,
    artist: {
        type: Types.ObjectId,
        name: String,
        role: String,
        ref: 'User',
    },
    reproductions: Number,
});
songSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
    },
});
export const SongModel = model<Song>('Song', songSchema, 'songs');
