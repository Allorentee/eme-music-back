import mongoose from 'mongoose';
import { UserModel } from '../../entities/user';
import { dbConnect } from '../../services/dbConnect/dbconnect';
import { UserRepo } from './user.repository';
import { PASSWD } from '../../config';

describe('Given UserRepo clas...', () => {
    const mockNewUserBadPssw = {
        name: 'Alvaro',
        email: 'allorentee@gmail.com',
        passwd: undefined,
    };
    const mockNewUser = {
        name: 'Alvaro',
        email: 'allorentee@gmail.com',
        passwd: PASSWD,
    };
    const mockUser = [
        { name: 'Alvariceps', email: 'alvariceps@gmail.com' },
        { name: 'Alvaricioso', email: 'alvaricioso@gmail.com' },
    ];
    const UserRepository = UserRepo.getInstance();
    let testIds: Array<string>;
    const setUpCollection = async () => {
        await dbConnect();
        await UserModel.deleteMany();
        await UserModel.insertMany(mockUser);
        const data = await UserModel.find();
        return [data[0].id, data[1].id];
    };
    beforeAll(async () => {
        testIds = await setUpCollection();
    });
    describe('then when we use post function', () => {
        test('this must return the user that we create', async () => {
            const result = await UserRepository.post(mockNewUser);
            expect(result.name).toEqual(mockNewUser.name);
        });
        test('this must return the user that we create', async () => {
            expect(
                async () => await UserRepository.post(mockNewUserBadPssw)
            ).rejects.toThrow();
        });
    });
    describe('then when we use OnlyOne function', () => {
        test('Must return the user', async () => {
            const result = await UserRepository.onlyOne(testIds[0]);
            expect(result.email).toEqual('alvariceps@gmail.com');
        });
    });
    describe('When we call getAll function...', () => {
        test('this function must return all songs', async () => {
            const spyFind = jest.spyOn(UserModel, 'find');
            const result = await UserRepository.getAll();
            expect(spyFind).toHaveBeenCalled();
            expect(result[1].name).toEqual(mockUser[1].name);
        });
    });
    describe('When we call delete function...', () => {
        test('should be return the element created', async () => {
            const result = await UserRepository.delete(testIds[0]);
            expect(result).toEqual(testIds[0]);
        });
    });
    afterAll(() => {
        mongoose.disconnect();
    });
});
