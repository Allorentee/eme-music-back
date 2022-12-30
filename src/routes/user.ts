import { Router } from 'express';
import { UserController } from '../controller/user.controller/user.controller.js';
import { logged } from '../middleware/logged.js';
import { SongRepo } from '../repository/songRepository/song.repository.js';
import { UserRepo } from '../repository/userRepository/user.repository.js';

export const usersRouter = Router();

const controller = new UserController(
    UserRepo.getInstance(),
    SongRepo.getInstance()
);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
usersRouter.patch(
    '/addfav/:id',
    logged,
    controller.addFavorites.bind(controller)
);
usersRouter.patch(
    '/deletefav/:id',
    logged,
    controller.deleteFavorites.bind(controller)
);
usersRouter.delete('/', logged, controller.deleteUser.bind(controller));
usersRouter.get('/', logged, controller.getOneUser.bind(controller));
