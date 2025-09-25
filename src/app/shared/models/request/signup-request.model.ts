

export interface SignupRequest {
  id?: number;
  nombres: string;
  apellidos: string;
  comuna: string;
  telefono: string;
  email: string;
  password: string;
  role: roles;
}

export type roles = 'ADMIN' |'APODERADO' |'TRANSPORTISTA';
