import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'


// @desc    Get user lessons
// @route   GET /api/users/lessons
// @access  Private
export const getCourse = asyncHandler(async (req, res) => {
    // id ребенка
    const { id } = req.params
    const groups = []
    const courseid = []
    const courses = []

    // ищем группы в которых сотоит ребенок, возвращает id групп
    const groupuser = await prisma.$queryRaw`SELECT groupid FROM group_members WHERE userid = ${id};`

    // прохожусь циклом на каждую группу
    for (let i = 0; i < groupuser.length; i++) {
        // ищу номер курса 
        let groupscourse = await prisma.$queryRaw`SELECT course FROM groupuser WHERE id = ${groupuser[i].groupid}`
        let allgroupscourse = await prisma.$queryRaw`SELECT * FROM groupuser WHERE id = ${groupuser[i].groupid}`
        courseid.push(...groupscourse)
        groups.push(...allgroupscourse)
    }

    // прохожусь по id курсов и нахожу там названия курсов
    for (let i = 0; i < courseid.length; i++) {
        let datacourse = await prisma.$queryRaw`SELECT * FROM courses WHERE id = ${courseid[i].course}`
        courses.push(...datacourse)
    }

    // id курса соотновится с idgroup ktplan
    res.json([groups, courses]);
})


export const getOneCousrse = asyncHandler(async (req, res) => {
    const { id, idgroup } = req.params
    const result = []

    const lessons = await prisma.attendance.findMany({
        where: {
            iduser: Number(id),
            group_id: Number(idgroup)
        }
    })

    const ktplan = await prisma.ktplan.findMany({
        where: {
            idgroup: `group=${idgroup}`,
        }
    })

    for (let i = 0; i < ktplan.length; i++) {
        let isAdd = false;
        for (let j = 0; j < lessons.length; j++) {
            if (String(lessons[j].dateat) === String(ktplan[i].datelesson)) {
                result.push({ ...lessons[j], ...ktplan[i] })
                isAdd = true;
            }
        }
        if (!isAdd) {
            result.push({ ...ktplan[i], 'status': null })
        }
    }

    res.json(result);
})


