import { Types } from "mongoose"

export type Playlist = {
    name: string
    genre: string
    songs: Array<Types.ObjectId>
    owner: Types.ObjectId
}
