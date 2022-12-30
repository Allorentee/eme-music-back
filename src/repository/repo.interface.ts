import { PartialSong, Song } from '../entities/songs.js';
import { User } from '../entities/user.js';

export type id = string;

export interface SharedRepo<T> {
    update: (id: id, data: Partial<T>) => Promise<T>;
    onlyOne: (id: id) => Promise<T>;
    query: (key: string, value: string) => Promise<Array<T>>;
    getAll: () => Promise<Array<T>>;
}

export interface BasicUserRepo extends SharedRepo<User> {
    post: (data: Partial<User>) => Promise<User>;
    delete: (id: id) => Promise<id>;
}

export interface BasicSongsRepo extends SharedRepo<Song> {
    post: (data: Partial<PartialSong>) => Promise<Song>;
    delete: (id: id) => Promise<Song>;
}
