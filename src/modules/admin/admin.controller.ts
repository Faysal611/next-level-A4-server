import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getUsers = async (req: Request, res: Response) => {
    try {
        const data = await adminService.getUsers();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

export const adminController = {
    getUsers
}