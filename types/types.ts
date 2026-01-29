import { Session, User } from "better-auth"

export interface CreateMeal {
    cuisine: string,
    description: string,
    name: string,
    tags: string[],
    providerId: string,
    price: number
}

declare global {
    namespace Express {
        interface Request {
            session?: Session,
            user?: User
        }
    }
}