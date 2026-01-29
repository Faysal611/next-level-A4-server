import { Router } from "express";
import { providerController } from "./provider.controller";

const router = Router();

router.post("/create-provider", providerController.createProvider)
router.post("/create-meal", providerController.createMeal)

export const providerRouter = router;