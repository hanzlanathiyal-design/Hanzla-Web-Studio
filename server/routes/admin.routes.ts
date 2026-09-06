import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { requireAdminAuth } from "../middleware/adminAuth";
import { adminLoginLimiter } from "../middleware/rateLimiter";

const router = Router();

// --- Public Admin Auth Gate (strictly server-side verification + rate limited) ---
router.post("/auth/login", adminLoginLimiter, (req, res, next) => adminController.login(req, res, next));
router.post("/auth/logout", (req, res) => adminController.logout(req, res));

// --- Protected Admin Endpoints (requires valid signed JWT) ---
router.get("/auth/me", requireAdminAuth, (req, res) =>
  adminController.getCurrentAdmin(req, res)
);

// Leads Management
router.get("/leads", requireAdminAuth, (req, res) =>
  adminController.getLeads(req, res)
);

router.get("/leads/:id", requireAdminAuth, (req, res) =>
  adminController.getLeadById(req, res)
);

router.patch("/leads/:id/status", requireAdminAuth, (req, res) =>
  adminController.updateLeadStatus(req, res)
);

router.delete("/leads/:id", requireAdminAuth, (req, res) =>
  adminController.deleteLead(req, res)
);

export const adminRoutes = router;
