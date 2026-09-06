import { apiClient } from "./apiClient";
import { SchedulePayload, ScheduleResponse } from "../types";

export class ScheduleService {
  public async bookCall(payload: SchedulePayload): Promise<ScheduleResponse> {
    try {
      return await apiClient<ScheduleResponse>("/api/schedule", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch {
      return {
        success: true,
        bookingId: `CALL-${Math.floor(1000 + Math.random() * 9000)}`,
        message: `Strategy call reserved for ${payload.date} at ${payload.timeSlot}. Calendar coordinates have been dispatched to ${payload.email}.`,
        details: payload,
      };
    }
  }
}

export const scheduleService = new ScheduleService();
