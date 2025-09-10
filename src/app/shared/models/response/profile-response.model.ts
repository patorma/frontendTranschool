import { Role } from "../enums/role.enum";

export interface Profile{

  id: number;
  nombres: string;
  apellidos: string;
  comuna: string;
  telefono: string;
  email: string;
  role: Role;
}
