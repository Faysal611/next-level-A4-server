import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../lib/prisma";
import { roles } from "../generated/prisma/enums";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    trustedOrigins: [process.env.POSTMAN_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: roles.customer
            },
            status: {
                type: "string",
                defaultValue: "active"
            }
        }
    },
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    }
})