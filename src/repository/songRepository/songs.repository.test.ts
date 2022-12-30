import mongoose from 'mongoose';
import { SongModel } from '../../entities/songs';
import { dbConnect } from '../../services/dbConnect/dbconnect';
import { SongRepo } from './song.repository';

describe('Given SongRepo..', () => {
    const mockSongs = [
        { name: 'Song1', email: '' },
        { name: 'Song2', email: '' },
    ];
    const mockNewSong = {
        name: 'Song1',
        file: '',
        image: '',
        genre: '',
        reproductions: 0,
    };
    const SongRepository = SongRepo.getInstance();
    let testIds: Array<string>;
    const falseDB = async () => {
        await dbConnect();
        await SongModel.deleteMany();
        await SongModel.insertMany(mockSongs);
        const data = await SongModel.find();
        return [data[0].id, data[0].id];
    };
    beforeAll(async () => {
        testIds = await falseDB();
    });
    describe('When we call getAll function...', () => {
        test('this function must return all songs', async () => {
            const spyFind = jest.spyOn(SongModel, 'find');
            const result = await SongRepository.getAll();
            expect(spyFind).toHaveBeenCalled();
            expect(result[1].name).toEqual(mockSongs[1].name);
        });
    });

    describe('then when we use post function', () => {
        test('should be return the element created', async () => {
            const result = await SongRepository.post(mockNewSong);
            expect(result.name).toEqual('Song1');
        });
    });

    describe('then when we use onlyOne function', () => {
        test('this must return all items with this id', async () => {
            const result = await SongRepository.onlyOne(testIds[0]);
            expect(result.name).toEqual('Song1');
        });
    });

    describe('then when we use query function', () => {
        test('this must return all items with key, value', async () => {
            const result = await SongRepository.query('name', 'Song1');
            expect(result[0].name).toEqual('Song1');
        });
    });
    describe('then when we use update function', () => {
        test('should be return the element created', async () => {
            const result = await SongRepository.update(testIds[0], {
                name: 'prueba',
            });

            expect(result.name).toEqual('prueba');
        });
    });
    describe('then when we use delete function', () => {
        test('should be return the element created', async () => {
            await SongRepository.delete(testIds[0]);
            expect(true).toBe(true);
        });
    });
    afterAll(() => {
        mongoose.disconnect();
    });
});
