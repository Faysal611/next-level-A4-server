import { toNodeHandler } from "better-auth/node";
import express from "express"
import { auth } from "../utils/auth";
export const app = express();


app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to FoodHub!')
})