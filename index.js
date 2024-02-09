import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js';
import homeRoute from './routes/homeRoute.js';
import influencerRoute from './routes/influencerRoute.js';
import { SpeedInsights } from "@vercel/speed-insights/next"
import cors from 'cors';
import config from './config.js';


const app = express();
mongoose.connect(config.DATABASE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors(
    {
        origin: 'https://picko-alpha.vercel.app/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));

const db = mongoose.connection;

db.on('error', err => {
    console.log('Error connecting to Database : ', err);
})

db.once('open', () => {
    console.log('Successfully connected to Database');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(authRoute);
    app.use(homeRoute);
    app.use('/api', influencerRoute)
    app.use('/api', adminRoute);

    app.listen(config.PORT, () => {
        console.log('Server up and running on port 5000');
    });
});