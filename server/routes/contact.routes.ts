import { Router } from "express";
import { contactController } from "../controllers";
import { validateBody, createRateLimiter } from "../middleware";
import { ContactSchema } from "../validators";

const router = Router();

// Rate limit: 5 contact requests per 10 minutes per IP
const contactRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
  message:
    "Too many inquiry submissions from your network. Please wait a few minutes before trying again or email directly at hanzlanathiyal@gmail.com.",
});

/**
 * POST /api/contact
 * Validates, sanitizes, rate-limits, stores the lead, and returns safe responses.
 */
router.post(
  "/",
  contactRateLimiter,
  validateBody(ContactSchema),
  (req, res, next) => contactController.submitContact(req, res, next)
);

export const contactRoutes = router;
