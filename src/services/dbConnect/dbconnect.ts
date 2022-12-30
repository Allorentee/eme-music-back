import mongoose from "mongoose";
import { CLUSTER, PASSWD, USER } from "../../config.js";

export async function dbConnect() {
    const DBName = process.env.NODE_ENV !== 'test' ? 'AppMusic' : 'AppMusicTest'
    let uri = `mongodb+srv://${USER}:${PASSWD}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    return mongoose.connect(uri)
}
