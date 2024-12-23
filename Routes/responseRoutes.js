import express from "express";
import {
  createResponse,
  getAllResponses,
  deleteResponse,
} from "../Controllers/responseController.js"; // Adjust the path

const router = express.Router();

// Routes
router.post("/responses", createResponse); // Create a new response
router.get("/responses", getAllResponses); // Get all responses
router.delete("/responses/:id", deleteResponse); // Delete a response by ID

export default router;
