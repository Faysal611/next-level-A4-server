import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { userStatus } from "../../../types/types";

const getUsers = async (req: Request, res: Response) => {
    try {
        const data = await adminService.getUsers();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const updateStatus = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const data = await adminService.updateStatus(userId as string);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
export const adminController = {
    getUsers,
    updateStatus
}