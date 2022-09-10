import express from "express";
import cors from "cors";
import coinRouter from "./routes/coin.route.js";

const app = express();

app.use(cors());

app.use("/api/v1/", coinRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server en ⭐ Puerto:" + PORT));
