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

export const providerController = {
    createProvider,
    createMeal
}