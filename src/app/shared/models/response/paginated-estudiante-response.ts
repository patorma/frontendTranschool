import { EstudianteResponse } from "./estudiante-response.model";

export interface PaginatedEstudianteResponse{

    totalElements: number;
    totalPages: number;
    size: number;
    content:EstudianteResponse[];

}
