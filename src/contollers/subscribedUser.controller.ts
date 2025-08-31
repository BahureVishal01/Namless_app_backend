import { Request, Response } from "express";
import { SubscribedUserService } from "../services/subscribedUser";

const subscribedService = new SubscribedUserService();
export class SubscribedUserController {
  async subscribe(req: Request, res: Response) {
    try {
    
      const user = await subscribedService.createSubscription(req.body);
      res.status(201).json({success:true, message: 'subscription activated', data: user});
    } catch (error) {
        res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }


}
