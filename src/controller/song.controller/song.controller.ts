import { NextFunction, Request, Response } from 'express';
import { ErrorSongsController } from '../../error/error.management.js';
import {
    BasicSongsRepo,
    BasicUserRepo,
} from '../../repository/repo.interface.js';
import { ExtraReq } from '../controllerInterface.js';

export class SongController {
    errors = new ErrorSongsController();
    constructor(
        public readonly songRepo: BasicSongsRepo,
        public readonly userRepo: BasicUserRepo
    ) {}
    async allSongs(req: Request, resp: Response, next: NextFunction) {
        try {
            const songs = await this.songRepo.getAll();
            resp.status(200);
            resp.json({ songs });
        } catch (error) {
            next(this.errors.control(error as Error));
        }
    }
    async createSong(req: ExtraReq, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) throw new Error('Invalid payload');
            const user = await this.userRepo.onlyOne(req.payload.id);
            req.body.artist = user;
            const song = await this.songRepo.post(req.body);
            user.mySongs.push(song.id);
            this.userRepo.update(user.id.toString(), {
                mySongs: user.mySongs,
            });
            resp.status(200);
            resp.json({ song });
        } catch (error) {
            next(this.errors.createControl(error as Error));
        }
    }
    async updateSong(req: ExtraReq, resp: Response, next: NextFunction) {
        try {
            const song = await this.songRepo.update(req.params.id, req.body);
            resp.json({ song });
        } catch (error) {
            next(this.errors.control(error as Error));
        }
    }
    async onlySong(req: ExtraReq, resp: Response, next: NextFunction) {
        try {
            const songs = await this.songRepo.onlyOne(req.params.id);
            resp.status(200);
            resp.json(songs);
        } catch (error) {
            next(this.errors.control(error as Error));
        }
    }
    async genreSongs(req: Request, resp: Response, next: NextFunction) {
        try {
            const songs = await this.songRepo.query(
                req.params.key,
                req.params.value
            );
            resp.status(200);
            resp.json({ songs });
        } catch (error) {
            next(error);
            next(this.errors.control);
        }
    }

    //INTENTO DE BORRAR UNA CANCION DE TODOS LOS USUARIOS. (Cuanado el artista borre su cancion que se elimine de todos los usuarios a la vez)
    //  async destroySong(req: ExtraReq, resp: Response, next: NextFunction){
    //      try{
    //          const songToDelete = await this.songRepo.onlyOne(req.params.id)
    //          const allUsers = await this.userRepo.getAll()
    //          const updateUsersWithoutSongDeleted = allUsers.map((user)=>  user.favoriteSongs.filter((song)=>song._id.toString()!==songToDelete.id.toString()))

    //          //PRIMER INTENTO PARA ACTUALIZAR TODOS LOS USUARIOS
    //          //const UpdateAllUsers = allUsers.map(async(user,index)=>{ await this.userRepo.update(user.id.toString(),{ [user.favoriteSongs.toString()]: updateUsersWithoutSongDeleted[index].toString()}) })
    //          //SEGUNDO INTENTO DE ACTUALIZACION DE CADA USUARIO.
    //         const userUpdated = await this.#UpdateUsers(allUsers,updateUsersWithoutSongDeleted)

    //         //  allUsers.forEach(async (user,index)=> await this.userRepo.update(user.id.toString(),{
    //         //      [user].favoriteSongs: updateUsersWithoutSongDeleted[index]
    //         //  }))
    //          resp.json(updateUsersWithoutSongDeleted)
    //      }catch(error){
    //          next(error as Error)
    //      }
    // }
    // async #UpdateUsers(allUsers: Array<User>,updateSongs: Array<Array<Types.ObjectId>>){
    //     let up;
    //     for(let i=0; i<allUsers.length; i++){
    //         for (let j = 0; j < allUsers.length; j++) {
    //          up = await this.userRepo.update(allUsers[i].id.toString(),{ [allUsers[i].favoriteSongs]:updateSongs[i][j].toString() })
    //         }
    //     }
    //     return up
    // Promise.All para intenta rresolver el array de promesas que me devuelve el .map
    // }
}
