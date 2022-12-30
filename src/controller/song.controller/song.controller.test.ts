import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HTTPError } from '../../error/interfaces/error';
import { SongRepo } from '../../repository/songRepository/song.repository';
import { UserRepo } from '../../repository/userRepository/user.repository';
import { ExtraReq } from '../controllerInterface';
import { SongController } from './song.controller';

describe('Given songs Controller', () => {
    const mockData = [
        {
            id: '2',
            name: 'puzzle',
        },
        {
            id: '3',
            name: 'puzzle',
        },
    ];
    const mockUser = [
        {
            id: 1,
            name: 'Alvaricioso',
            mySongs: [],
        },
    ];

    SongRepo.prototype.post = jest.fn().mockResolvedValue(mockData[0]);

    const songRepo = SongRepo.getInstance();
    songRepo.getAll = jest.fn().mockResolvedValue(mockData);
    songRepo.onlyOne = jest.fn().mockResolvedValue(mockData[0]);
    songRepo.delete = jest.fn().mockResolvedValue(mockData[1].id);
    songRepo.post = jest.fn().mockResolvedValue(mockData[0]);
    songRepo.update = jest.fn().mockResolvedValue(mockData[0]);
    songRepo.query = jest.fn().mockResolvedValue(mockData);
    const userRepo = UserRepo.getInstance();
    userRepo.onlyOne = jest.fn().mockResolvedValue({ id: '34', songss: [] });
    userRepo.update = jest.fn();

    const songContoller = new SongController(songRepo, userRepo);
    let req: Partial<ExtraReq> = {
        params: { key: 'math', value: 'first' },
        body: { owner: 'owner' },
        payload: 'payload' as unknown as JwtPayload,
    };
    const res: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    describe('When we instantiate it', () => {
        test('Then allsongss should have been called', async () => {
            await songContoller.allSongs(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ songs: mockData });
        });
        test('Then getsongs should have been called', async () => {
            req.params = { id: '0' };
            await songContoller.onlySong(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ songs: mockData });
        });
        test('Then createsongs should have been called', async () => {
            req.params = { id: '2' };
            const userwithSong = {
                id: 1,
                name: 'Alvaricioso',
                mySongs: [
                    {
                        id: '2',
                        name: 'puzzle',
                    },
                ],
            };
            songRepo.post = jest.fn().mockResolvedValue({
                id: '2',
                name: 'puzzle',
            });
            userRepo.onlyOne = jest.fn().mockResolvedValue(mockUser[0]);
            userRepo.update = jest.fn().mockResolvedValue(userwithSong);
            await songContoller.createSong(
                req as Request,
                res as Response,
                next
            );
            expect(res.status).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                song: {
                    id: '2',
                    name: 'puzzle',
                },
            });
        });
        test('Then createsongs should have been called', async () => {
            songRepo.update = jest.fn().mockResolvedValue(mockData[0]);
            await songContoller.createSong(
                req as Request,
                res as Response,
                next
            );
            expect(res.status).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ songs: mockData });
        });
        test('Then updatesongs should have been called', async () => {
            await songContoller.updateSong(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ songs: mockData });
        });
    });

    describe('when we dont instantiate it', () => {
        const error = new HTTPError(404, 'Not Found', 'Message of error');
        test('Then if something went wrong allsongss should throw an error', async () => {
            songRepo.getAll = jest.fn().mockRejectedValue(new Error('Error'));

            await songContoller.allSongs(
                req as ExtraReq,
                res as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if something went wrong getsongs should throw an error', async () => {
            songRepo.onlyOne = jest.fn().mockRejectedValue(new Error('Error'));

            await songContoller.onlySong(
                req as ExtraReq,
                res as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if something went wrong findsongs should throw an error', async () => {
            songRepo.onlyOne = jest.fn().mockRejectedValue(new Error('Error,'));

            await songContoller.genreSongs(
                req as ExtraReq,
                res as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if something went wrong createsongs should throw an error', async () => {
            songRepo.post = jest.fn().mockRejectedValue(new Error('Error'));

            await songContoller.createSong(
                req as ExtraReq,
                res as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if something went wrong updatesongs should throw an error', async () => {
            songRepo.update = jest.fn().mockRejectedValue(new Error('Error'));

            await songContoller.updateSong(
                req as ExtraReq,
                res as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if something went wrong query should throw an error', async () => {
            songRepo.query = jest.fn().mockRejectedValue(new Error('Error'));

            await songContoller.genreSongs(
                req as ExtraReq,
                res as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then if something went wrong create should throw an error', async () => {
            await songContoller.createSong(
                req as Request,
                res as Response,
                next
            );
            expect(error).toBeInstanceOf(HTTPError);
        });
    });
    describe('Whitout Payload', () => {
        test('Then createsongs should have been called', async () => {
            req = {};
            req.params = { id: '2' };
            const userwithSong = {
                id: 1,
                name: 'Alvaricioso',
                mySongs: [
                    {
                        id: '2',
                        name: 'puzzle',
                    },
                ],
            };
            songRepo.post = jest.fn().mockResolvedValue({
                id: '2',
                name: 'puzzle',
            });
            userRepo.onlyOne = jest.fn().mockResolvedValue(mockUser[0]);
            userRepo.update = jest.fn().mockResolvedValue(userwithSong);
            await songContoller.createSong(
                req as Request,
                res as Response,
                next
            );
            expect(res.status).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                song: {
                    id: '2',
                    name: 'puzzle',
                },
            });
        });
    });
});
