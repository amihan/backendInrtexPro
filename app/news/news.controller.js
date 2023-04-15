import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getNews = asyncHandler(async (req, res) => {

    const news = await prisma.ads.findMany()

    res.json(news)
})
