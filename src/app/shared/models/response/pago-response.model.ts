import { MensualidadResponse } from "./mensualidad-response.model";

export interface PagoResponse{
    id: number;
    montoPagado: number;
    fechaPago: string;
    mensualidad: MensualidadResponse;
}
