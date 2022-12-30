import { HTTPError } from './interfaces/error.js';

export class ErrorUserController {
    loginControl(error: Error) {
        if (error.message === 'Contraseña Incorrecta') {
            const httpPssError = new HTTPError(
                401,
                'Incorrect Password',
                error.message
            );
            return httpPssError;
        }
        if (error.message === 'Usuario no encontrado') {
            const httpUsrError = new HTTPError(
                404,
                'Usuario no encontrado',
                error.message
            );
            return httpUsrError;
        }
        const httpError = new HTTPError(500, 'Service Out', error.message);
        return httpError;
    }
    addFav(error: Error) {
        if (error.message === 'Cancion ya se encuentra en favoritos') {
            const httpError = new HTTPError(
                405,
                'Cancion ya en Favoritos',
                error.message
            );
            return httpError;
        }
        const httpError = new HTTPError(500, 'Service Out', error.message);
        return httpError;
    }
}

export class ErrorSongsController {
    createControl(error: Error) {
        if (error.message === 'Invalid payload') {
            const httpPylError = new HTTPError(
                401,
                'Invalid Payload',
                error.message
            );
            return httpPylError;
        }
        const httpError = new HTTPError(500, 'Service Out', error.message);
        return httpError;
    }
    control(error: Error) {
        const httpError = new HTTPError(500, 'Service Out', error.message);
        return httpError;
    }
}

export class ErrorMiddlewares {
    middleWare(error: Error) {
        if (error.message === 'Usuario o contraseña incorrecto') {
            const loggedError = new HTTPError(401, 'Forbidden', 'Unauthorized');
            return loggedError;
        }
        const httpError = new HTTPError(500, 'Service Out', error.message);
        return httpError;
    }
}
