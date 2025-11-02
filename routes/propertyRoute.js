import express from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const PropertRouter = express.Router();

// 🏠 Public Routes
PropertRouter.get("/", getAllProperties);
PropertRouter.get("/:id", getPropertyById);

// 🔒 Admin-Only Routes
PropertRouter.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  upload.array("images", 4), // up to 5 images
  addProperty
);
PropertRouter.put("/:id", authenticate, authorizeRoles("admin"), updateProperty);
PropertRouter.delete("/:id", authenticate, authorizeRoles("admin"), deleteProperty);

export default PropertRouter;
