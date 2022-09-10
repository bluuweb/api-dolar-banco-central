import { Router } from "express";
import { all, bitcoin, dolar, uf } from "../controllers/coin.controller.js";

const router = Router();

router.get("/all", all);
router.get("/bitcoin", bitcoin);
router.get("/dolar", dolar);
router.get("/uf", uf);

export default router;
