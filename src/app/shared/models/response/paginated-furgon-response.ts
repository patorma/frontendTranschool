import { FurgonResponse } from "./furgon-response.model";

export interface PaginatedFurgonResponse{
    totalElements: number;
    totalPages: number;
    size: number;
    content: FurgonResponse[];
}
