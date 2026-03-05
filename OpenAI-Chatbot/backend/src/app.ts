import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

//To access .env file
config();
const app = express();

////Middlewares
//To pass json with post, put api
app.use(express.json());

//To apply HTTP only cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//To see logs for api calls - need to remove when production ready
app.use(morgan("dev"));

//API versioning (v1), control pass to the appRouter
app.use("/api/v1/", appRouter);

// app.get("/hello", (req, res, next) => {
//   return res.send("Hello");
// });
// app.post("/hello/:id", (req, res, next) => {
//   console.log(req.params.id);
//   console.log(req.body.name);
//   return res.send("Hello");
// });

export default app;
