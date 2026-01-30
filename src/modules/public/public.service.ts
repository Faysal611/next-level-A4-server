import { prisma } from "../../../lib/prisma"

const getProviders = async () => {
    return await prisma.providerProfile.findMany({
        include: {
            user: true
        }
    });
}

const getMeals = async (cuisine: string[], lowestPrice: number, highestPrice: number) => {
    
    if (cuisine.length == 0) {
        return await prisma.meal.findMany({
            where: {
                price: {
                    gte: lowestPrice,
                    lte: highestPrice
                }
            },
            include: {
                cuisine: true,
                providerProfile: true
            }
        })
    }

    const cuisineData = await prisma.category.findMany({
        where: {
            cuisine: {
                in: cuisine
            },
        },
    })

    const arr = cuisineData.map(data => data.id);
    
    return await prisma.meal.findMany({
        where: {
            cuisineId: {
                in: arr
            },
            price: {
                gte: lowestPrice,
                lte: highestPrice
            }
        },
        include: {
            cuisine: true,
            providerProfile: true
        }
    })
}

const providerWithMenu = async (providerId: string) => {
    return await prisma.providerProfile.findUnique({
        where: {
            id: providerId
        },
        include: {
            meals: true
        }
    })
}

export const publicService = {
    getProviders,
    getMeals,
    providerWithMenu
}