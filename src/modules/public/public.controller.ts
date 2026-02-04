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
        const lowest = req.query.lowest == undefined ? undefined : parseInt(req.query.lowest as string);
        const highest = req.query.highest == undefined ? undefined : parseInt(req.query.highest as string);
        const page = req.query.page == undefined ? 1 : parseInt(req.query.page as string);
        const limit = req.query.limit == undefined ? 10 : parseInt(req.query.limit as string);
        const search = req.query.search == undefined ? undefined : req.query.search as string;
        

        const data = await publicService.getMeals(cuisine, lowest, highest, page, limit, search);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const providerWithMenu = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const data = await publicService.providerWithMenu(userId as string);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const getMeal = async (req: Request, res: Response) => {
    try {
        const { mealId } = req.params;
        const data = await publicService.getMeal(mealId as string);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
export const publicController = {
    getProviders,
    getMeals,
    providerWithMenu,
    getMeal
}