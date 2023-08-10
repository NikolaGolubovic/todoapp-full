import { Todo } from "../todos/todo.entity";
import { RefreshToken } from "../refresh-token/refresh-token.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserValidationRules } from "../validations/user.validation";

@Entity({ name: "users", schema: "public" })
export class User extends UserValidationRules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
