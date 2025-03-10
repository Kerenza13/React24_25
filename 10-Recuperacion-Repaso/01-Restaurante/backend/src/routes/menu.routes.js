import express from "express";
import {
  createDish,
  deleteDish,
  getAllDishes,
  getDish,
  updateDish,
} from "../controllers/menu.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Rutas públicas
router.get("/", getAllDishes);
router.get("/:id", getDish);

// Rutas protegidas que requieren autenticación
router.use(authenticateToken);
router.post("/", createDish);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

export default router;
