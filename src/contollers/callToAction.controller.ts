import { Request, Response } from "express";
import { ActionService } from "../services/callToAction";


const actionService = new ActionService();
export class ActionController {
  async uploadResume(req: Request, res: Response) {
    try {
        const file = req.file;
        const logoUrl = file ? `/uploads/${file.filename}` : null;

        const data = {
        ...req.body,
        resume: logoUrl,
        };
        
        const resume = await actionService.uploadResume(data);

      res.status(201).json({success:true, message: 'Resume uploaded successfully', data: resume});
    } catch (error) {
      res.status(500).json({ error: (error || "Some thing went wrong")});
    }
  }


}
