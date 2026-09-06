import { Request, Response, NextFunction } from "express";
import { scheduleService } from "../services";

export class ScheduleController {
  public async book(req: Request, res: Response, next: NextFunction) {
    try {
      const booking = await scheduleService.bookSession(req.body);
      return res.status(201).json({
        success: true,
        bookingId: booking.id,
        message: `Strategy session reserved for ${booking.date} at ${booking.timeSlot}. A calendar invite with Google Meet coordinates has been dispatched to ${booking.email}.`,
        details: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const bookings = await scheduleService.listBookings();
      return res.json({ success: true, count: bookings.length, bookings });
    } catch (error) {
      next(error);
    }
  }
}

export const scheduleController = new ScheduleController();
