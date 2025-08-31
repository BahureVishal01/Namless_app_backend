import { Router } from "express";

import  subscribeRoutes  from "./subscribedUser.routes";
import  jobRoutes  from "./job.routes";
import  actionRoutes  from "./callToAction.routes";


const router = Router();

router.use("/jobs", jobRoutes);
router.use("/subscribedUsers", subscribeRoutes);
router.use("/actions", actionRoutes);

export default router;