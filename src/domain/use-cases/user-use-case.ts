import { User } from "../entities/user-entity";

export class UserCreateUseCase {
  run({ name, email, password }: UserProps) {
    const user = User.create({ name, email, password });

    return user;
  }
}

interface UserProps {
  name: string;
  email: string;
  password: string;
}
