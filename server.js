import { config } from "dotenv";
import express from "express";

import authRoutes from './app/auth/auth.routes.js'
import userRoutes from './app/user/user.routes.js'
import newsRoutes from './app/news/news.routes.js'
import paymentsRoutes from './app/payments/payments.routes.js'
import lessonsRoutes from './app/lessons/lessons.routes.js'

import dotenv from 'dotenv'
import morgan from 'morgan'
import 'colors'
import { prisma } from './app/prisma.js';
import { errorHandler, notFound } from './app/middleware/error.middleware.js';

import cors from 'cors'



dotenv.config()

const app = express();

async function main() {

    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

    const PORT = process.env.PORT || 5000;

    app.use(express.json())

    app.use(cors({
        credentials: true,
        origin: process.env.CLIENT_URL
    }));

    app.use('/api/auth', authRoutes)

    app.use('/api/users', userRoutes)

    app.use('/api/news', newsRoutes)

    app.use('/api/payments', paymentsRoutes)

    app.use('/api/lessons', lessonsRoutes)


    app.use(notFound)
    app.use(errorHandler)

    app.listen(PORT, console.log(`🌐 Serever работает PORT = ${PORT}`.blue.bold))
}



main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })