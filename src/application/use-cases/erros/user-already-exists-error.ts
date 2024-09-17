export class UserEmailExistsError extends Error {
  constructor() {
    super('User already exists')
  }
}
