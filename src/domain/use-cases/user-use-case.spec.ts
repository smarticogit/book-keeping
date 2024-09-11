import { UserCreateUseCase } from "./user-use-case";

test("create an user", () => {
  const userCreated = new UserCreateUseCase();

  const user = {
    name: "John",
    email: "j@j.com",
    password: "123456",
  };

  const userResponse = userCreated.run(user);

  expect(userResponse).toEqual(
    expect.objectContaining({
      name: "John",
      email: "j@j.com",
      password: "123456",
      active: true,
      createdAt: expect.any(Date),
    })
  );
});
