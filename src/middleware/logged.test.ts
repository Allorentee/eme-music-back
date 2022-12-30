
import { NextFunction, Response } from 'express';
import { ExtraReq } from '../controller/controllerInterface';
import { TokenOptions } from '../services/token/tokenUtils';
import { logged } from './logged';

describe('Given the logged interceptor', () => {

    TokenOptions.prototype.readToken = jest.fn().mockReturnValueOnce('')

    test('Then if the readToken inside the logged interceptor function reads a correct token, it should return the payload', () => {
        const req: Partial<ExtraReq> = {
            get: jest
                .fn()
                .mockReturnValueOnce(
                    'Be1rer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiQWx2YXJpY2lvc28iLCJyb2wiOiJhcnRpc3QifQ.M1ku5ZcypiJ6VlL6q7f5wHgshU07GiOI7q2rMlw0auo'
                ),
           
        };
        const res: Partial<Response> = {};
        const next: NextFunction = jest.fn();
        logged(req as ExtraReq, res as Response, next);
        expect(next).toHaveBeenCalledWith();
    });

    test('Then if the readToken inside the logged interceptor function reads a correct token, it should return the payload', () => {
        const req: Partial<ExtraReq> = {
            get: jest
                .fn()
                .mockReturnValueOnce(
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiQWx2YXJpY2lvc28iLCJyb2wiOiJhcnRpc3QifQ.M1ku5ZcypiJ6VlL6q7f5wHgshU07GiOI7q2rMlw0auo'
                ),
            
        };
        const res: Partial<Response> = {};
        const next: NextFunction = jest.fn();
        logged(req as ExtraReq, res as Response, next);
        expect(next).toHaveBeenCalled();
    });
    
    test('Then if the readToken inside the logged interceptor function reads a correct token, it should return the payload', () => {
        TokenOptions.prototype.readToken = jest.fn().mockReturnValueOnce(false)
        const req: Partial<ExtraReq> = {};
        req.get = jest.fn()
        const res: Partial<Response> = {};
        const next: NextFunction = jest.fn();
        logged(req as ExtraReq, res as Response, next);
        expect(next).toHaveBeenCalled();
    });


});
