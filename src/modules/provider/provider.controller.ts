import { Request, Response } from "express"
import { providerService } from "./provider.service"

const createProvider = async (req: Request, res: Response) => {
    try {
        const data = await providerService.createProvider(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const createMeal = async (req: Request, res: Response) => {
    try {
        const data = await providerService.createMeal(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateMeal = async (req: Request, res: Response) => {
    try {
        const {mealId} = req.params;
        const data = await providerService.updateMeal(req.body, mealId as string);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const deleteMeal = async (req: Request, res: Response) => {
    try {
        const {mealId} = req.params;
        const data = await providerService.deleteMeal(mealId as string);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const data = await providerService.updateOrder(orderId as string, status);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
export const providerController = {
    createProvider,
    createMeal,
    updateMeal,
    deleteMeal,
    updateOrder
}