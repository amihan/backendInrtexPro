import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getPayments = asyncHandler(async (req, res) => {

    const { id, idgroup } = req.params

    const payMonths = await prisma.pay.findMany({
        where: {
            id_user: Number(id),
            id_group: Number(idgroup)
        }
    })

    res.json(payMonths)
})
