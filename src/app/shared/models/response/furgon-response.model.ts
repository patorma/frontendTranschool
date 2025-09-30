import { Profile } from "./profile-response.model";

export interface FurgonResponse{
  id: number;
  patente: string;
  descripcion: string;
  enabled: boolean;
  usuarioTransportista: Profile
}
