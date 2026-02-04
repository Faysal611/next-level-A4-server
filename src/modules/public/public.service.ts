import { mealWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../../lib/prisma"

const getProviders = async () => {
    return await prisma.providerProfile.findMany({
        include: {
            user: true
        }
    });
}

const getMeals = async (cuisine: string[], lowestPrice: number | undefined, highestPrice: number | undefined, page: number, limit: number, search: string | undefined) => {
    let andConditions: mealWhereInput[] = [];

    if (cuisine.length != 0) {
        andConditions.push({
            cuisine: {
                cuisine: {
                    in: cuisine
                }
            }
        })
    }

    if (lowestPrice != undefined) {
        andConditions.push({
            price: {
                gte: lowestPrice
            }
        })
    }

    if (highestPrice != undefined) {
        andConditions.push({
            price: {
                lte: highestPrice
            }
        })
    }

    if (search != undefined) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            ]
        })
    }

    return await prisma.$transaction(async (tx) => {
        const count = await tx.meal.count();
        const meals = await tx.meal.findMany({
            where: {
                AND: andConditions
            },
            skip: (page - 1) * limit,
            take: limit
        })

        return {
            allMealData: {
                meals,
                pagination: {
                    totalMealCount: count,
                    pageCount: Math.ceil(count / limit),
                    currentPage: page,
                    limit,
                    currentPageMealCount: meals.length
                }
            }
        }
    },
        {
            maxWait: 20000,
            timeout: 30000
        })
}

const providerWithMenu = async (userId: string) => {
    return await prisma.providerProfile.findUnique({
        where: {
            userId
        },
        include: {
            meals: true
        }
    })
}

const getMeal = async (mealId: string) => {
    return await prisma.meal.findUnique({
        where: {
            id: mealId
        },
        include: {
            cuisine: true,
            providerProfile: true
        }
    })
}

export const publicService = {
    getProviders,
    getMeals,
    providerWithMenu,
    getMeal
}