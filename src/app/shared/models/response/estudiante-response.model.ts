import { Profile } from './profile-response.model';

export interface EstudianteResponse {
  id: number;
  nombres: string;
  apellidos: string;
  colegio: string;
  email: string;
  fechaNacimiento: string;
  usuarioApoderado: Profile;
}
