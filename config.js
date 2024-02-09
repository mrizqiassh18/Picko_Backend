import dotenv from 'dotenv';

dotenv.config();

const config = {
    SECRET_KEY: process.env.SECRET_KEY,
    DATABASE_KEY: process.env.DATABASE_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    PORT:process.env.PORT
}

export default config;