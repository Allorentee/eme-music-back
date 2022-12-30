import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { dbConnect } from '../services/dbConnect/dbconnect';
import { UserModel } from '../entities/user';
import { SongModel } from '../entities/songs';
const mockPassword =
    '$2a$10$bC1Z8FnHtXqVRp9H0PBnte/KyGXvEyNQ9azLhRC0Bp.XtgxLZi9Gi';
const collection = async () => {
    const mockUser = [
        {
            name: 'Alvariceps',
            email: 'Alvariceps@gmail.com',
            role: 'artist',
            passwd: mockPassword,
        },
        {
            name: 'Alvaricioso',
            email: 'Alvaricioso@gmail.com',
            role: 'artist',
            passwd: mockPassword,
        },
    ];
    await UserModel.deleteMany();
    await UserModel.insertMany(mockUser);
    await SongModel.deleteMany();
    const data = await UserModel.find();
    const testIds = [data[0].id, data[1].id];
    return testIds;
};

describe('Given an "app" with /users route', () => {
    beforeAll(async () => {
        await dbConnect();
    });
    beforeEach(async () => {
        await collection();
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    describe('When i Have connection to mongoDB', () => {
        test('then the get to url /users/register should sent status 200', async () => {
            const mockPassword = '1234';
            const response = await request(app)
                .post('/users/register')
                .send({ name: 'Alvaro', passwd: mockPassword });
            expect(response.status).toBe(201);
        });
        test('then the get to url /users/register with error should sent status 200', async () => {
            const response = await request(app).post('/users/register');
            expect(response.status).toBe(500);
        });
        test('then the get to url /users/login with error should sent status 201', async () => {
            const mockPassword = 'prueba2';
            const response = await request(app)
                .post('/users/login')
                .send({ name: 'Alvariceps', passwd: mockPassword });
            expect(response.status).toBe(201);
        });
        test('then the get to url /users/login with error should sent status 401', async () => {
            const mockPassword = 'incorrect';
            const response = await request(app)
                .post('/users/login')
                .send({ name: 'Alvaricioso', passwd: mockPassword });
            expect(response.status).toBe(401);
        });
        test('then the get to url /users/login with error should sent status 401', async () => {
            const mockPassword = '1234';
            const response = await request(app)
                .post('/users/login')
                .send({ name: 'profdd', passwd: mockPassword });
            expect(response.status).toBe(404);
        });
        test('then the get to url /users/addfav with error should sent status 404', async () => {
            const response = await request(app)
                .post('/users/addfav')
                .send({ id: '638dc448a89042971bb4221d' });
            expect(response.status).toBe(404);
        });
    });
});
