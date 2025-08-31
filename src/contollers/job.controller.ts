// src/controllers/job.controller.ts
import { Request, Response } from "express";
import { JobService } from "../services/job.services";

const jobService = new JobService();

export class JobController {
  async create(req: Request, res: Response) {
    try {
    const file = req.file;
    const logoUrl = file ? `/uploads/${file.filename}` : null;

    const jobData = {
      ...req.body,
      companyLogo: logoUrl,
    };
      const job = await jobService.createJob(jobData);
      res.status(201).json({success:true, message: 'job created', data: job});
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  async getAll(req: Request, res: Response) {
   try {
    const { page, limit, jobTitle, location, employmentType, workExperience, salary, salaryType, datePosted} = req.query;

    const jobs = await jobService.getAllJobs({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      jobTitle: jobTitle as string,
      location: location as string,
      employmentType: employmentType as string,
      workExperience: workExperience as string,
      salary: salary as string,
      salaryType: salaryType as string,
      datePosted: datePosted as string,
    });

    res.status(200).json({success:true, message: 'job lists', data: jobs});
  } catch (error) {
     res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      });
  }
  }

}
