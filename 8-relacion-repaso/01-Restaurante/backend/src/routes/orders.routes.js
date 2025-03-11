import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/orders.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.route("/").get(getAllOrders).post(createOrder);

router.route("/:id").get(getOrder).put(updateOrderStatus);

export default router;
