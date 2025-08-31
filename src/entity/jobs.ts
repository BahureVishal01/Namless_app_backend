import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { WorkExperience } from "../enum/workExperience";
import { EmploymentType } from "../enum/employmentType";
import { SalaryType } from "../enum/salaryType";

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  companyName!: string;

  @Column({ nullable: true })
  companyLogo!: string;  

  @Column()
  jobTitle!: string;

  @Column({
  type: "enum",
  enum: EmploymentType,
  default: EmploymentType.FULL_TIME,
  })
  jobType!: string;

  @Column()
  location!: string;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  salary!: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column("text")
  descriptions!: string;

  @Column({
    type: "enum",
    enum: WorkExperience,
    default: WorkExperience.ANY,
  })
  workExperience!: WorkExperience;
  
  @Column({
    type: "enum",
    enum: SalaryType,
    default: SalaryType.MONTHLY,
  })
  salaryType!: SalaryType;
}
