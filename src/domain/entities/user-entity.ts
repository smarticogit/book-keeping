import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get active() {
    return this.props.active;
  }

  static create(
    props: Omit<UserProps, "createdAt" | "active">,
    id?: UniqueEntityId
  ) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
        active: true,
      },
      id
    );

    return user;
  }
}

interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  active: boolean;
}
