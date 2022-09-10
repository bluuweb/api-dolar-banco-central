import cors from "cors";
import express from "express";
import router from "./routes/index.js";

/*
 * Mañana no podre estar en el directo, porque tengo clases de la Univ todo el dia
 * ya estoy por salir de la carrera (Ing. en Sistemas Computacionales)
 * pero si veré la retransmisión 😎
 */

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`server on port: 🌟 ${PORT} 🌟`));
