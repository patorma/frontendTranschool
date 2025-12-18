import { EstudianteResponse } from "./estudiante-response.model";
import { FurgonResponse } from "./furgon-response.model";
import { RecorridoResponse } from "./recorrido-response.model";

export interface AsignacionEstudianteResponse{
    id:number;
    fechaRegistro:string;
    estudiante:EstudianteResponse;
    furgon: FurgonResponse;
    recorrido: RecorridoResponse;
}
