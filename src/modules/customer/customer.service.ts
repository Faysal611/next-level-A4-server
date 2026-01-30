import { mealCreateWithoutProviderProfileInput, orderUncheckedCreateInput } from "../../../generated/prisma/models"
import { prisma } from "../../../lib/prisma"


const createOrder = async (data: {mealId: string, userId: string, quantity: number}) => {
    return await prisma.order.create({data});
}

const getOrders = async (userId: string) => {
    return await prisma.order.findMany({
        where: {
            userId
        },
        include: {
            meal: true
        }
    })
}

const orderDetails = async (orderId: string) => {
    return await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            meal: true
        }
    })
}

export const customerService = {
    createOrder,
    getOrders,
    orderDetails
}