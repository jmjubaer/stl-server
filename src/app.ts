import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Stl Server is runner on port 5000");
});

app.use(globalErrorHandler);
export default app;
