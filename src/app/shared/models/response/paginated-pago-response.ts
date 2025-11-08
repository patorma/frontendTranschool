import { PagoResponse } from "./pago-response.model";

export interface PaginatedPagoResponse{
    totalElements: number;
    totalPages: number;
    size: number;
    content:PagoResponse[];
    number:number;
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
