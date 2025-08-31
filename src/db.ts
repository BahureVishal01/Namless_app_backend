import "reflect-metadata";
import { DataSource } from "typeorm";
import { Job } from "./entity/jobs";
import { CallToAction } from "./entity/callToAction";
import { SubscribedUser } from "./entity/subscribedUser";
// import { User } from "./entity/User";

export const AppDB = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres" , 
  password: process.env.DB_PASSWORD || "root",   
  database: process.env.DB_NAME || "namless_db",   
  synchronize: true,     
  logging: true,
  entities: [Job, CallToAction, SubscribedUser],
  migrations: [],
  subscribers: [],
});
