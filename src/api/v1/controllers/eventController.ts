import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";

// GET /api/v1/health (Path for Postman testing)
export const healthCheck = (req: Request, res: Response): void => {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();
  const version = "1.0.0";

  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: uptime,
    timestamp: timestamp,
    version: version,
  });
};

// GET /api/v1/events (Path for Postman testing)
export const getAllEvents = (req: Request, res: Response): void => {
  try {
    const events = eventService.getAllEvents();

    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved",
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve events",
    });
  }
};

// GET /api/v1/events/:id (Path for Postman testing)
export const getEventById = (req: Request, res: Response): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);

    const event = eventService.getEventById(id);

    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event retrieved",
      data: event,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve event",
    });
  }
};

// GET /api/v1/events/:id/popularity (Path for Postman testing)
export const getEventPopularity = (req: Request, res: Response): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);

    const popularityData = eventService.calculatePopularity(id);

    if (!popularityData) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event popularity calculated",
      data: popularityData,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to calculate popularity",
    });
  }
};

// POST /api/v1/events (Path for Postman testing)
export const createEvent = (req: Request, res: Response): void => {
  try {
    const { name, date, capacity } = req.body;

    // Validate required fields
    if (!name) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: name",
      });
      return;
    }

    if (!date) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: date",
      });
      return;
    }

    if (!capacity) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: capacity",
      });
      return;
    }

    // Create the event
    const newEvent = eventService.createEvent(name, date, capacity);

    res.status(HTTP_STATUS.CREATED).json({
      message: "Event created",
      data: newEvent,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create event",
    });
  }
};

// PUT /api/v1/events/:id (Path for Postman testing)
export const updateEvent = (req: Request, res: Response): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const { name, date, capacity } = req.body;

    // Validate ID exists
    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: id",
      });
      return;
    }

    // Validate required fields
    if (!name || !date || !capacity) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required fields",
      });
      return;
    }

    // Update the event
    const updatedEvent = eventService.updateEvent(id, name, date, capacity);

    if (!updatedEvent) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event updated",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update event",
    });
  }
};

// DELETE /api/v1/events/:id (Path for Postman testing)
export const deleteEvent = (req: Request, res: Response): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);

    const deleted = eventService.deleteEvent(id);

    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event deleted",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete event",
    });
  }
};