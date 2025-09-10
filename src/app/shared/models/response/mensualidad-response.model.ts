import { Estado } from "../enums/estado.enum";

export interface MensualidadResponse {
  id: number;
  monto: number;
  fechaVencimiento: string;
  estado: Estado;
  enabled: boolean;
}
