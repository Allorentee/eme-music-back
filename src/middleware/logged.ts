import { NextFunction, Response } from "express";
import { ExtraReq } from "../controller/controllerInterface.js";
import { ErrorMiddlewares } from "../error/error.management.js";
import { TokenOptions } from "../services/token/tokenUtils.js";

export const logged = (req: ExtraReq,res: Response,next: NextFunction) => {
    const tokenOp = new TokenOptions()
    const errors = new ErrorMiddlewares()
    
    const authString = req.get('Authorization');
    if (!authString || !authString?.startsWith('Bearer'))
    {next(errors.middleWare(new Error('Usuario o contraseña incorrecto')))}
    try {
        const token = (authString as string).slice(7);
        req.payload = tokenOp.readToken(token);
        next();
    } catch (error) {
        next(errors.middleWare(error as Error));
    }
};
