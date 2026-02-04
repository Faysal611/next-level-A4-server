import { Request, Response } from "express";
import { customerService } from "./customer.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const data = await customerService.createOrder({ ...req.body, userId: req.user?.id });
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const getOrders = async (req: Request, res: Response) => {
    try {
        const data = await customerService.getOrders(req.user?.id as string);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const orderDetails = async (req: Request, res: Response) => {
    try {
        const data = await customerService.orderDetails(req.params.orderId as string);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const addReview = async (req: Request, res: Response) => {
    try {
        const review = req.body;
        const data = await customerService.addReview({...review, userId: req.user?.id});
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
const getCuisine = async (req: Request, res: Response) => {
    try {
        const data = await customerService.getCuisine();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

export const customerController = {
    createOrder,
    getOrders,
    orderDetails,
    addReview,
    getCuisine
}