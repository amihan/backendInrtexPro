import bcrypt from 'bcrypt';
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { generateToken } from "./generate-token.js";
import jwt from 'jsonwebtoken';
// import tokenService from '../service/token-service.js';


// @desc    Auth user
// @route   POST /api/auth/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const { login, password } = req.body;

        const user = await prisma.parents.findFirst({
            where: {
                login
            }
        })

        if (!user) {
            return res.status(400).json({ message: `Пользователь ${login} не найден` })
        }
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (user && isValidPassword) {
            const token = generateToken(user.id)
            res.json({ user, token })
        } else {
            res.status(401).json({ message: 'Email и(или) пароль введены не корректно' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Auth error' })
    }
})


// @desc    Register user
// @route   POST /api/auth/register
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const { email, password, login } = req.body

        const isHaveUser = await prisma.parents.findFirst({
            where: {
                login
            }
        })

        if (isHaveUser) {
            res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован!' })
        }

        const user = await prisma.parents.create({
            data: {
                email,
                password: bcrypt.hashSync(password, 5),
                login,
                hash: 'bcrypt'
            }
        })
        const token = generateToken(user.id)
        res.json({ user, token });
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Register error' })
    }
})


export const refresh = asyncHandler(async (req, res) => {
    try {
        const { token } = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userFound = await prisma.parents.findFirst({
            where: {
                id: decoded.userId
            }
        })
        console.log(userFound)

        if (userFound) {
            res.json(userFound)
        } else {
            res.status(401).json({ message: 'Пользователь не найден' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Auth error' })
    }
})