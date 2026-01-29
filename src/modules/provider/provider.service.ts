import { mealUncheckedCreateInput, ProviderProfileUncheckedCreateInput } from "../../../generated/prisma/models";
import { prisma } from "../../../lib/prisma";
import { roles } from "../../../generated/prisma/enums";
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
    const { cuisine, ...mealWithoutCuisine } = meal;

    return await prisma.$transaction(async (tx) => {
        const data = await tx.catagory.upsert({
            where: { cuisine },
            update: {},
            create: {
                cuisine
            }
        })

        return await tx.meal.create({
            data: {
                ...mealWithoutCuisine,
                cuisineId: data.id
            }
        })
    },
        {
            maxWait: 20000,
            timeout: 30000
        })
}

export const providerService = {
    createProvider,
    createMeal
}