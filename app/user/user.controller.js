import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await prisma.users.findMany({
        where: {
            parent: String(req.user.id)
        }
    })

    res.json(user)
})


export const getOneProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await prisma.users.findFirst({
        where: {
            id: Number(id)
        }
    })

    res.json(user)
})
