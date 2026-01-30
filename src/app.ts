import { toNodeHandler } from "better-auth/node";
import express from "express"
import { auth } from "../utils/auth";
import { customerRouter } from "./modules/customer/customer.router";
import { providerRouter } from "./modules/provider/provider.router";
import { publicRouter } from "./modules/public/public.router";
export const app = express();


app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.use("/public", publicRouter);
// app.use("/customer", customerRouter);
app.use("/provider", providerRouter)

app.get('/', (req, res) => {
    res.send('Welcome to FoodHub!')
})