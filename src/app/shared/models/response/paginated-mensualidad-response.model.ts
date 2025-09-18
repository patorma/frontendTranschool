import { MensualidadResponse } from "./mensualidad-response.model";

export interface PaginatedMensualidadResponse{
   totalElements: number;
    totalPages: number;
    size: number;
    content: MensualidadResponse[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    empty: boolean;
}
