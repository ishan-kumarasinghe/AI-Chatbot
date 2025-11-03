import { config } from "dotenv"
//To open application server
import express from "express";
import { connectToMongoDB } from "./connections/mongodbConnections.js";
import userRouter from "./routes/user-router.js";

config();

const app = express();

//First Route
// app.use("/", (req, res, next) => {
//   return res.status(200).json({ message: "Hi I'm Listening!" });
// });

app.use("/user", userRouter);
// app.use("/chats");

connectToMongoDB()
  .then(() => {
    //To open development server of the application
    app.listen(process.env.PORT, () =>
      console.log("Server Open and running.")
    );
  })
  .catch((err) => console.error(err));

console.log(
  "This is a starter kit for this amazing project."
);
