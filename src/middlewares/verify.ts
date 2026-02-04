import { NextFunction, Request, Response } from "express"
import { auth } from "../../utils/auth"
import { userStatus } from "../../generated/prisma/enums"
import { User } from "../../generated/prisma/client"

export const verify = (...arr: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const sesssion = await auth.api.getSession({
            headers: new Headers(req.headers as Record<string, string>)
        })
        if(sesssion == null) {
            return res.status(401).send({message: "Please log in", success: false})
        }

        if (sesssion.user.status == userStatus.suspended) {
            return res.status(401).send({ message: "Your account is suspended" })
        }

        if (!arr.includes(sesssion.user.role)) {
            return res.status(401).send({ message: "Unauthorized" })
        }

        req.session = sesssion.session;
        req.user = sesssion.user as User;
        next();
    }
}