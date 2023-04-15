import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getPayments = asyncHandler(async (req, res) => {
    const user = await prisma.pay.findMany({
        where: {
            iduser: req.user.id
        }
    })
    res.json(user)
})
