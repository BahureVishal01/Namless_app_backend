import { Router } from "express";
import { ActionController } from "../contollers/callToAction.controller";
import { upload } from "../middleware/uploads";


const router = Router();
const actionController = new ActionController();

router.post("/upload-resume", upload.single('resume'), actionController.uploadResume);

export default router;
