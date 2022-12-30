import { UserController } from './user.controller';
import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../../repository/userRepository/user.repository';
import { SongRepo } from '../../repository/songRepository/song.repository';
import { Password } from '../../services/password/password.options';
import { ExtraReq } from '../controllerInterface';
import { TokenOptions } from '../../services/token/tokenUtils';

jest.mock('../../services/password/password.options.ts');
jest.mock('../../services/token/tokenUtils.ts');

Password.prototype.validate = jest.fn().mockResolvedValue(true);
TokenOptions.prototype.createToken = jest
    .fn()
    .mockReturnValue('ghjjhyuopsidh12344573198723lpoiu');

describe('Given the UserController', () => {
    const mockUsers = [
        {
            id: 9,
            name: 'alvaricioso',
            email: 'alvaricioso@gmail.com',
            favoriteSongs: [],
        },
        {
            id: 9,
            name: 'Alvariceps',
            email: 'Alvariceps@gmail.com',
            favoriteSongs: [],
        },
    ];
    const mockSongs = [
        {
            id: 9,
            name: 'alvaricioso',
            genre: '',
        },
        {
            id: 10,
            name: 'AlvariciosoSong',
            genre: '',
        },
    ];
    const mockToken = 'ghjjhyuopsidh12344573198723lpoiu';
    const userRepo = UserRepo.getInstance();
    const songRepo = SongRepo.getInstance();
    userRepo.onlyOne = jest.fn().mockResolvedValue(mockUsers);
    userRepo.post = jest.fn().mockResolvedValue(mockToken);
    userRepo.query = jest.fn().mockResolvedValue(mockUsers);
    const userController = new UserController(userRepo, songRepo);
    const next: NextFunction = jest.fn();
    let req: Partial<ExtraReq> = {
        body: { name: '', passwd: '' },
        payload: { id: '1' },
    };
    const resp: Partial<Response> = {};

    beforeEach(() => {
        resp.json = jest.fn().mockReturnValue(resp);
        resp.status = jest.fn().mockReturnValue(resp);
    });
    describe('When the DeleteFav is running', () => {
        const mockSongsDelete = [
            {
                id: 1,
                name: 'alvaricioso',
                genre: '',
            },
            {
                id: 2,
                name: 'AlvariciosoSong',
                genre: '',
            },
        ];
        const mockUserDelete = {
            id: 9,
            name: 'alvaricioso',
            email: 'alvaricioso@gmail.com',
            favoriteSongs: [mockSongsDelete[0], mockSongsDelete[1]],
        };

        test('This should return the user updated...', async () => {
            userRepo.onlyOne = jest.fn().mockResolvedValueOnce([]);
            songRepo.onlyOne = jest.fn().mockResolvedValueOnce([]);
            await userController.deleteFavorites(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When DeleteUser...', () => {
        test('this should return the user', async () => {
            userRepo.delete = jest.fn().mockResolvedValueOnce(mockUsers[0].id);
            await userController.deleteUser(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(resp.json).toHaveBeenCalled();
        });
        test('this should return the user', async () => {
            userRepo.delete = jest.fn().mockReturnValueOnce(undefined);
            await userController.deleteUser(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When the register is run', () => {
        test('Then it should return the user', async () => {
            const user = { name: 'alvaricioso' };
            (userRepo.post as jest.Mock).mockResolvedValueOnce(user);

            await userController.register(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.status).toHaveBeenCalledWith(201);
            expect(resp.json).toHaveBeenCalled();
        });
    });
    describe('When the register is NOT run', () => {
        test('Then it should reject a Error', async () => {
            (userRepo.post as jest.Mock).mockRejectedValue(new Error('Error'));
            await userController.register(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When the login is run and the password IS CORRECT ✅', () => {
        test('Then it should return a token', async () => {
            userRepo.query = jest.fn().mockResolvedValue(mockUsers);
            await userController.login(req as ExtraReq, resp as Response, next);
            expect(resp.status).toHaveBeenCalledWith(201);
            expect(resp.json).toHaveBeenCalledWith({
                token: mockToken,
                user: mockUsers,
            });
        });
    });
    describe('When the login is run and the password IS INCORECT ❌', () => {
        test('Then it should reject a error', async () => {
            userRepo.query = jest
                .fn()
                .mockRejectedValueOnce(new Error('Error'));
            await userController.login(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });
        test('Then it should reject a error when pass is not validated', async () => {
            Password.prototype.validate = jest
                .fn()
                .mockResolvedValueOnce(false);
            userRepo.query = jest.fn().mockResolvedValueOnce(mockUsers);
            await userController.login(req as ExtraReq, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });
        test('Then it should reject a error when user not found', async () => {
            userRepo.query = jest.fn().mockResolvedValueOnce([]);
            await userController.login(req as ExtraReq, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When getOnlyOne user...', () => {
        test('this should return the user', async () => {
            userRepo.onlyOne = jest.fn().mockResolvedValueOnce(mockUsers[0].id);
            await userController.getOneUser(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(resp.json).toHaveBeenCalled();
        });
    });
    describe('When the addFavorites is run', () => {
        test('Then it should return Error with the song already in fav', async () => {
            songRepo.onlyOne = jest.fn().mockResolvedValueOnce(mockSongs[0]);
            userRepo.onlyOne = jest.fn().mockResolvedValueOnce(mockUsers[0]);
            userRepo.update = jest.fn().mockResolvedValueOnce({
                id: mockUsers[0].id,
                name: mockUsers[0].name,
                email: mockUsers[0].email,
                favoriteSongs: [mockSongs[0]],
            });
            req.payload = { id: '1' };
            await userController.addFavorites(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('Test withoutpayload', () => {
        test('Then it should return error invalid payload', async () => {
            req = {};
            songRepo.onlyOne = jest.fn().mockResolvedValueOnce(mockSongs[1]);
            userRepo.onlyOne = jest.fn().mockResolvedValueOnce(mockUsers[0]);
            userRepo.update = jest.fn().mockResolvedValueOnce({
                id: mockUsers[0].id,
                name: mockUsers[0].name,
                email: mockUsers[0].email,
                favoriteSongs: [mockSongs[0]],
            });
            await userController.addFavorites(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('This should return the user updated...', async () => {
            userRepo.onlyOne = jest.fn().mockResolvedValueOnce([]);
            songRepo.onlyOne = jest.fn().mockResolvedValueOnce([]);
            await userController.deleteFavorites(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('this should return the user', async () => {
            userRepo.delete = jest.fn().mockReturnValueOnce(undefined);
            await userController.deleteUser(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('this should return the user', async () => {
            userRepo.onlyOne = jest.fn().mockReturnValueOnce(undefined);
            await userController.getOneUser(
                req as ExtraReq,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
});
