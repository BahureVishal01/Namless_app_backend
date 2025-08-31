// src/routes/job.routes.ts
import { Router } from "express";
import { JobController } from "../contollers/job.controller";
import { upload } from "../middleware/uploads";

const router = Router();
const jobController = new JobController();

router.post("/create", upload.single("companyLogo"),  jobController.create);
router.get("/list", jobController.getAll);

export default router;
