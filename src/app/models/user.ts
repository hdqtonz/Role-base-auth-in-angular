import { Role } from './role';

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  age: Role;
  token?: string;
}
