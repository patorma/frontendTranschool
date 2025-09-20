

export interface Profile{

  id: number;
  nombres: string;
  apellidos: string;
  comuna: string;
  telefono: string;
  email: string;
  role: roles;
}
export type roles = 'ADMIN' |'APODERADO' |'TRANSPORTISTA';
