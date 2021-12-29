export interface User{
  id: string,
  name:string,
  email: string,
  password: string,
  role: 'customer' | 'admin',
}

export interface CreaUsertDTO extends Omit<User, 'id'>{}
