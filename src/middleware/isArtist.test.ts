
import { NextFunction, Response } from 'express';
import { ExtraReq } from '../controller/controllerInterface';
import { isArtist } from './isArtist';


describe('Given the logged interceptor', () => {

    test('Then if the readToken inside the logged interceptor function reads a correct token, it should return the payload', () => {
        const req: Partial<ExtraReq> = {
            payload: {}
        };
        req.payload = {
            role: 'artist'
        }
        const res: Partial<Response> = {};
        const next: NextFunction = jest.fn();
        isArtist(req as ExtraReq, res as Response, next);
        expect(next).toHaveBeenCalled();
    });
    test('Then if the readToken inside the logged interceptor function reads a correct token, it should return the payload', () => {
        const req: Partial<ExtraReq> = {
            payload: {}
        };
        req.payload = {
            role: 'consumer'
        }
        const res: Partial<Response> = {};
        const next: NextFunction = jest.fn();
        isArtist(req as ExtraReq, res as Response, next);
        expect(next).toHaveBeenCalled();
    });
});
