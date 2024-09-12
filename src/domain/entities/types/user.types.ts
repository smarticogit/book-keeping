export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  active: boolean
}

export type UserProps = Omit<User, 'id' | 'createdAt' | 'active'>
