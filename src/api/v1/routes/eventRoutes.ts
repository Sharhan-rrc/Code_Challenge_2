import express, { Router } from "express";
import {
  healthCheck,
  getAllEvents,
  getEventById,
  getEventPopularity,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";

const router: Router = express.Router();

router.get("/health", healthCheck);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.get("/events/:id/popularity", getEventPopularity);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;
