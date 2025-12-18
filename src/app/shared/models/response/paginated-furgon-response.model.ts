import { FurgonResponse } from "./furgon-response.model";

export interface PaginatedFurgonResponse{
    totalElements: number;
    totalPages: number;
    size: number;
    content: FurgonResponse[];
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
