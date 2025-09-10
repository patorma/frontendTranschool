import { Role } from '../enums/role.enum';

export interface SignupRequest {
  id: number;
  nombres: string;
  apellidos: string;
  comuna: string;
  telefono: string;
  email: string;
  password: string;
  role: Role;
}
