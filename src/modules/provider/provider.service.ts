import { ProviderProfileUncheckedCreateInput } from "../../../generated/prisma/models";
import { prisma } from "../../../lib/prisma";
import { roles, status } from "../../../generated/prisma/enums";
import { CreateMeal } from "../../../types/types";

const createProvider = async (data: ProviderProfileUncheckedCreateInput) => {
    return await prisma.$transaction(async (tx) => {
        await tx.user.update({
            where: { id: data.userId },
            data: { role: roles.provider }
        })

        return await tx.providerProfile.create({ data })
    },
        {
            maxWait: 20000,
            timeout: 30000
        })
}

const createMeal = async (meal: CreateMeal) => {
    const { cuisine, userId, ...mealWithoutCuisine } = meal;

    return await prisma.$transaction(async (tx) => {
        const provider = await tx.providerProfile.findUnique({
            where: {
                userId
            },
        })

        const data = await tx.category.upsert({
            where: { cuisine },
            update: {},
            create: {
                cuisine
            }
        })

        return await tx.meal.create({
            data: {
                ...mealWithoutCuisine,
                cuisineId: data.id,
                providerId: provider?.id as string
            }
        })
    },
        {
            maxWait: 20000,
            timeout: 30000
        })
}

const updateMeal = async (mealData: CreateMeal, mealId: string) => {
    const { cuisine, ...restData } = mealData;
    if (!cuisine) {
        return await prisma.meal.update({
            where: { id: mealId },
            data: { ...restData }
        })
    }

    return await prisma.$transaction(async (tx) => {
        const data = await tx.category.upsert({
            where: { cuisine },
            update: {},
            create: {
                cuisine
            }
        })

        return await tx.meal.update({
            where: { id: mealId },
            data: {
                ...restData,
                cuisineId: data.id
            }
        })
    }, {
        maxWait: 20000,
        timeout: 30000
    })
}

const deleteMeal = async (mealId: string) => {
    return await prisma.meal.delete({
        where: {id: mealId}
    })
}

const updateOrder = async (orderId: string, status: status) => {
    await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status
        }
    })
}

const getProviderOrders = async (providerId: string) => {
    return await prisma.providerProfile.findUnique({
        where: {
            userId: providerId
        }, 
        include: {
            orders: true
        }
    })
}

export const providerService = {
    createProvider,
    createMeal,
    updateMeal,
    deleteMeal,
    updateOrder,
    getProviderOrders
}