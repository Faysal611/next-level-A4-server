import { Session } from "better-auth"
import { User } from "../generated/prisma/client"

export interface CreateMeal {
    cuisine: string,
    description: string,
    name: string,
    tags: string[],
    userId: string,
    price: number
}

export enum userStatus {
    suspended,
    active
}

declare global {
    namespace Express {
        interface Request {
            session?: Session,
            user?: User
        }
    }
}