export interface User{
  id: string,
  name:string,
  email: string,
  password: string
}

export interface CreaUsertDTO extends Omit<User, 'id'>{}
