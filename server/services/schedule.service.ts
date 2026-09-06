import { db } from "../db";
import { ScheduleInput } from "../validators";
import { BookingEntity } from "../db/schema";

export class ScheduleService {
  public async bookSession(input: ScheduleInput): Promise<BookingEntity> {
    return await db.addBooking({
      name: input.name,
      email: input.email,
      date: input.date,
      timeSlot: input.timeSlot,
      projectBrief: input.projectBrief,
    });
  }

  public async listBookings(): Promise<BookingEntity[]> {
    return await db.getBookings();
  }
}

export const scheduleService = new ScheduleService();
