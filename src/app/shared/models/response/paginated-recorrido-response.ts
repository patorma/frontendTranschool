import { RecorridoResponse } from "./recorrido-response.model";

export interface PaginatedRecorridoResponse{
    totalElements: number;
    totalPages: number;
    size: number;
    content: RecorridoResponse[];
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
