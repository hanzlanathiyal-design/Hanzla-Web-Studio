import { Request, Response } from "express";
import { config } from "../config";

export class HealthController {
  public check(req: Request, res: Response) {
    return res.json({
      status: "online",
      studio: config.studio.name,
      leadEngineer: config.studio.leadEngineer,
      activeSlots: config.studio.activeClientSlots,
      responseSla: `${config.studio.responseSlaHours} Hours`,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
}

export const healthController = new HealthController();
