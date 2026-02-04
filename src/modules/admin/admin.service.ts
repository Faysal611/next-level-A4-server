import { userStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma"

const getUsers = async () => {
    return await prisma.user.findMany();
}

const updateStatus = async (userId: string) => {
    return await prisma.$transaction(async (tx) => {
        const userStatusDB = await tx.user.findUnique({
            where: {
                id: userId
            },
            select: {
                status: true
            }
        })

        if (userStatusDB?.status == userStatus.active) {
            return await tx.user.update({
                where: {
                    id: userId
                },
                data: {
                    status: userStatus.suspended
                }
            })
        }
        return await tx.user.update({
            where: {
                id: userId
            },
            data: {
                status: userStatus.active
            }
        })
    },
        {
            maxWait: 20000,
            timeout: 30000
        })
}

const deleteCuisine = async (cuisineId: string) => {
    return await prisma.category.delete({
        where: {
            id: cuisineId
        }
    })
}

export const adminService = {
    getUsers,
    updateStatus,
    deleteCuisine
}