import express from "express";
import cors from "cors";
import allRouter from "./routes/coin.route.js";

const app = express();

app.use(cors());

app.use("/api/v1", allRouter);
app.get("/*", (_, res) => res.redirect("/api/v1/all"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server en ⭐ Puerto:" + PORT));
