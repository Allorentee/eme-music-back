import { NextFunction, Request, Response } from 'express';
import { setCors } from './cors';

describe('Given the setCors middleware', () => {
    describe('When it is called', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue(''),
        };
        const res: Partial<Response> = {
            setHeader: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then it should set the header', () => {
            const req: Partial<Request> = {
                header: jest.fn().mockReturnValue('*'),
            };
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toBeCalled();
        });
        test('Then when the request header is "*", it should add "*"', () => {
            req.header = jest.fn().mockReturnValue('*');
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toBeCalled();
            expect(res.setHeader).toHaveBeenCalledWith(
                'Access-Control-Allow-Origin',
                '*'
            );
        });
        test('Then when the request header is "Origin", it should add "Origin"', () => {
            req.header = jest.fn().mockReturnValue('Origin');
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toBeCalled();
            expect(res.setHeader).toHaveBeenCalledWith(
                'Access-Control-Allow-Origin',
                'Origin'
            );
        });
    });
});
