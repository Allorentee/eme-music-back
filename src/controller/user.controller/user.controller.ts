import { NextFunction, Request, Response } from 'express';
import { ErrorUserController } from '../../error/error.management.js';
import {
    BasicSongsRepo,
    BasicUserRepo,
} from '../../repository/repo.interface.js';
import { Password } from '../../services/password/password.options.js';
import { TokenOptions } from '../../services/token/tokenUtils.js';
import { ExtraReq } from '../controllerInterface.js';

export class UserController {
    token = new TokenOptions();
    password = new Password();
    errors = new ErrorUserController();
    constructor(
        public readonly userRepo: BasicUserRepo,
        public readonly songRepo: BasicSongsRepo
    ) {}
    async register(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.userRepo.post(req.body);
            resp.status(201);
            resp.json({ user: user });
        } catch (error) {
            next(this.errors.loginControl(error as Error));
        }
    }
    async login(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.userRepo.query('name', req.body.name);
            if (user.length === 0) throw new Error('Usuario no encontrado');
            const passValidate = await this.password.validate(
                req.body.passwd,
                user[0].passwd
            );
            if (!passValidate) throw new Error('Contraseña Incorrecta');

            const token = this.token.createToken({
                id: user[0].id.toString(),
                name: user[0].name,
                role: user[0].role,
            });
            resp.status(201);
            resp.json({ user, token });
        } catch (error) {
            next(this.errors.loginControl(error as Error));
        }
    }

    async getOneUser(req: ExtraReq, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) throw new Error('Invalid Payload');
            const user = await this.userRepo.onlyOne(req.payload.id);
            resp.status(200);
            resp.json({ user });
        } catch (error) {
            next(error);
        }
    }
    async addFavorites(req: ExtraReq, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) {
                throw new Error('Invalid payload');
            }
            const user = await this.userRepo.onlyOne(req.payload.id);

            const songToFav = await this.songRepo.onlyOne(req.params.id);

            if (user.favoriteSongs.includes(songToFav.id)) {
                throw new Error('Cancion ya se encuentra en favoritos');
            }

            user.favoriteSongs.push(songToFav.id);
            await this.userRepo.update(user.id.toString(), {
                favoriteSongs: user.favoriteSongs,
            });

            resp.status(201);
            resp.json(songToFav);
        } catch (error) {
            next(this.errors.addFav(error as Error));
        }
    }
    async deleteFavorites(req: ExtraReq, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) throw new Error('Not found payload');
            const user = await this.userRepo.onlyOne(req.payload.id);

            const songToDelete = await this.songRepo.onlyOne(req.params.id);

            const updateWithoutSong = user.favoriteSongs.filter(
                (song) => song.toString() !== songToDelete.id.toString()
            );

            await this.userRepo.update(user.id.toString(), {
                favoriteSongs: updateWithoutSong,
            });
            resp.json(songToDelete);
        } catch (error) {
            next(error);
        }
    }
    async deleteUser(req: ExtraReq, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) throw new Error('Invalid Payload');
            const user = await this.userRepo.delete(req.payload.id);
            resp.json(user);
        } catch (error) {
            next(this.errors.addFav(error as Error));
        }
    }
}
