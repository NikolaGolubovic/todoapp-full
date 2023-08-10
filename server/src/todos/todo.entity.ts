import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { TodoType } from "../data";

@Entity({ name: "todos", schema: "public" })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todo: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  type: TodoType;

  @Column()
  userId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: { id: number; username: string; email: string };
}
