import express from "express";
import { config } from "dotenv";
config();
const app = express();
app.use(express.json());
// app.get("/hello", (req, res, next) => {
//   return res.send("Hello");
// });
app.post("/hello/:id", (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body.name);
    return res.send("Hello");
});
export default app;
//# sourceMappingURL=app.js.map