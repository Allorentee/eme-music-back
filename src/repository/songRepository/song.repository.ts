import { PartialSong, Song, SongModel } from '../../entities/songs.js';
import { BasicSongsRepo, id } from '../repo.interface.js';

export class SongRepo implements BasicSongsRepo {
    static instance: SongRepo;
    public static getInstance(): SongRepo {
        if (!SongRepo.instance) {
            SongRepo.instance = new SongRepo();
        }
        return SongRepo.instance;
    }
    #Model = SongModel;

    async getAll(): Promise<Array<Song>> {
        const result = await this.#Model.find();
        return result;
    }

    async query(key: string, value: string): Promise<Array<Song>> {
        const result = await this.#Model.find({ [key]: value });
        return result as unknown as Array<Song>;
    }

    async post(data: Partial<PartialSong>): Promise<Song> {
        const result = await (
            await this.#Model.create(data)
        ).populate('artist');
        return result;
    }

    async delete(id: id): Promise<Song> {
        const song = await this.#Model.findByIdAndDelete(id);
        return song as Song;
    }

    async update(id: string, data: Partial<Song>): Promise<Song> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        return result as Song;
    }

    async onlyOne(id: id): Promise<Song> {
        const result = await this.#Model
            .findById(id)
            .populate('artist', { songs: 0 });
        return result as Song;
    }
}
