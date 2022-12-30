import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { usersRouter } from './routes/user.js';
import { songsRouter } from './routes/songs.js';
import { setCors } from './middleware/cors.js';

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
    origin: '*',
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use(setCors);
app.get('/', (_req, res) => {
    res.send('API Express / songs or users').end();
});
app.use('/users', usersRouter);
app.use('/songs', songsRouter);
