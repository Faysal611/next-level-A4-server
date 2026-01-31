import { prisma } from "../../../lib/prisma"

const getUsers = async () => {
    return await prisma.user.findMany();
}

export const adminService = {
    getUsers
}