import { Router } from "express";
import { SubscribedUserController } from "../contollers/subscribedUser.controller";


const router = Router();
const subscribedUserController = new SubscribedUserController();

router.post("/subscribe", subscribedUserController.subscribe);


export default router;
