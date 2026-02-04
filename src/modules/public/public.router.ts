import { Router } from "express";
import { publicController } from "./public.controller";

const router = Router();

router.get("/get-providers", publicController.getProviders)
router.get("/get-provider-menu/:userId", publicController.providerWithMenu)
router.get("/get-meals", publicController.getMeals)
router.get("/get-meal/:mealId", publicController.getMeal)

export const publicRouter = router;