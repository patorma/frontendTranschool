import { MensualidadResponse } from "./mensualidad-response.model";

//equivalente  a respuesta de {{base_url_transchool}}/mensualidades/my-mensualidades/page
export interface PaginatedResponse{

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
