import { debug } from "console";
import { NextFunction, Response } from "express";
import { ExtraReq } from "../controller/controllerInterface.js";
import { ErrorMiddlewares } from "../error/error.management.js";

export const isArtist = async (
    req: ExtraReq,
    res: Response,
    next: NextFunction
) => {
    const errors = new ErrorMiddlewares
    debug('Checking role...');
    try {
        if (!req.payload || req.payload.role !== 'artist') {
            throw new Error('Unauthorized');
        }
        next();
    } catch (error) {
        next(errors.middleWare(error as Error));
    }
};
