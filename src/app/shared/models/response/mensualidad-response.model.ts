import { Estado } from "../enums/estado.enum";
import { Profile } from "./profile-response.model";

export interface MensualidadResponse {
  id: number;
  monto: number;
  fechaVencimiento: string;
  estado: Estado;
  enabled: boolean;
  usuario:  Profile;
}
