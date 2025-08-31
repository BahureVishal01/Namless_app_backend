import { AppDB } from "../db";
import { Job } from "../entity/jobs";

export class JobService {
  private jobRepository = AppDB.getRepository(Job);

  async createJob(data: Partial<Job>): Promise<Job> {
    const job = this.jobRepository.create(data);
    return await this.jobRepository.save(job);
  }

  timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
}

  async getAllJobs({
    page = 1,
    limit = 10,
    jobTitle,
    location,
    employmentType,
    workExperience,
    salary,
    salaryType,
    datePosted,
  }: {
    page?: number;
    limit?: number;
    jobTitle?: string;
    location?: string;
    employmentType?: string;
    workExperience?: string;
    salary?: string;
    salaryType?: string;
    datePosted?: string;
  }) {
    
    const query = this.jobRepository.createQueryBuilder("job");

    if (jobTitle) {
      query.andWhere("job.jobTitle ILIKE :title", { title: `%${jobTitle}%` });
    }

    if (location) {
      query.andWhere("job.location ILIKE :loc", { loc: `%${location}%` });
    }

    if (employmentType && employmentType.length > 0) {
      query.andWhere("job.jobType = :type", { type: employmentType });
    }

    if (workExperience) {
      query.andWhere("job.workExperience = :exp", { exp: workExperience });
    }

    if (salary) {
      query.andWhere("job.salary <=:salary", { salary: salary });
    }

    if (datePosted) {
    let cutoffDate: Date | null = null;

    cutoffDate = new Date(Date.now() - Number(datePosted) * 24 * 60 * 60 * 1000);

    if (cutoffDate) {
      query.andWhere("job.createdAt >= :cutoffDate", { cutoffDate });
    }
  }
  if (salaryType) {
      query.andWhere("job.salaryType = :salaryType", { salaryType });
  }
  query.orderBy("job.createdAt", "DESC");
    query.skip((page - 1) * limit).take(limit);

    const [jobs, total] = await query.getManyAndCount();
    const jobsWithDatePosted = jobs.map((job, i) => ({
    ...job,
    postedAt: this.timeAgo(new Date(job.createdAt)),
    isNew: i === 0
  }));
    return {
      data: jobsWithDatePosted,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
  
}
