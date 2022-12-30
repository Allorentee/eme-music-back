import { model, Schema, Types } from "mongoose";
import { Playlist } from "./playlist.js";

export type User = {
    id: Types.ObjectId,
    name: string
    email: string
    passwd: string
    role: string
    favoriteSongs: Array<Types.ObjectId>
    mySongs: Array<Types.ObjectId>
    playlist?: Array<Playlist>
}

export const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    passwd: String,
    role: String,
    favoriteSongs: [{
        type: Types.ObjectId,
        name: String,
        image: String,
        file: String,
        ref: 'Song'
    }],
    mySongs: [{
        type: Types.ObjectId,
        name: String,
        image: String,
        file: String,
        ref: 'Song'
    }],
})

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});


export const UserModel = model<User>('User', userSchema,'users')
