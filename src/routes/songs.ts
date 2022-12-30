import { Router } from 'express';
import { SongController } from '../controller/song.controller/song.controller.js';
import { isArtist } from '../middleware/isArtist.js';
import { logged } from '../middleware/logged.js';
import { SongRepo } from '../repository/songRepository/song.repository.js';
import { UserRepo } from '../repository/userRepository/user.repository.js';

export const songsRouter = Router();

const controller = new SongController(
    SongRepo.getInstance(),
    UserRepo.getInstance()
);
songsRouter.get('/:key/:value', controller.genreSongs.bind(controller));
songsRouter.get('/', controller.allSongs.bind(controller));
songsRouter.get('/:id', controller.onlySong.bind(controller));
songsRouter.post('/', logged, isArtist, controller.createSong.bind(controller));
songsRouter.patch(
    '/updateSong/:id',
    logged,
    isArtist,
    controller.updateSong.bind(controller)
);
