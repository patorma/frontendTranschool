import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagoRequest } from '../models/request/pago-request.model';
import { Observable } from 'rxjs';
import { PagoResponse } from '../models/response/pago-response.model';
import { PaginatedPagoResponse } from '../models/response/paginated-pago-response';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
 private baseURLAdmin: string = `${environment.HOST}/admin`;
 private http = inject(HttpClient);
 constructor() { }

 getAllPagosByAdmin(page:number,size: number):Observable<PaginatedPagoResponse>{
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<PaginatedPagoResponse>(`${this.baseURLAdmin}/pagos/page`,{ params })
 }

 createPagoByAdmin(pagoRequest:PagoRequest):Observable<PagoResponse>{
  return this.http.post<PagoResponse>(`${this.baseURLAdmin}/pago`,pagoRequest);
 }

}
