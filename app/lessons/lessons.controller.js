import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'


// @desc    Get user lessons
// @route   GET /api/users/lessons
// @access  Private
export const getLessons = asyncHandler(async (req, res) => {
    const { id } = req.params

    const lessons = await prisma.attendance.findMany({
        where: {
            iduser: Number(id)
        }
    })

    const ktplan1 = await prisma.ktplan.findMany({
        where: {
            idgroup: `group=${lessons[0].group_id}`,
        }
    })

    const ktplan2 = await prisma.ktplan.findMany({
        where: {
            idgroup: `ind=${lessons[0].group_id}`,
        }
    })

    const ktplan = [...ktplan1, ...ktplan2]

    const result = []


    for (let i = 0; i < lessons.length; i++) {
        for (let j = 0; j < ktplan.length; j++) {
            if (String(lessons[i].dateat) === String(ktplan[j].datelesson)) {
                result.push({ ...ktplan[j], ...lessons[i] })
            }
        }
    }

    res.json(result);

    // получить два массива с занятиями и планом занятий, если дата сходится. то смержить объекты
})
