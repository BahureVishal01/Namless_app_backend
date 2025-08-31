import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("subscribed_users")
export class SubscribedUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}