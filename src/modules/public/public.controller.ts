import { Request, Response } from "express";
import { publicService } from "./public.service";


const getProviders = async (req: Request, res: Response) => {
    try {
        const data = await publicService.getProviders();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const getMeals = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        const cuisine = typeof req.query.cuisine == "string" ? req.query.cuisine.split(",") : [];
        const lowest = req.query.lowest == undefined ? 0 : parseInt(req.query.lowest as string);
        const highest = req.query.highest == undefined ? 9999 : parseInt(req.query.highest as string);

        const data = await publicService.getMeals(cuisine, lowest, highest);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const providerWithMenu = async (req: Request, res: Response) => {
    try {
        const { providerId } = req.params;
        const data = await publicService.providerWithMenu(providerId as string);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const publicController = {
    getProviders,
    getMeals,
    providerWithMenu
}