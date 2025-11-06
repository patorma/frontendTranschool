import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PagoRequest } from '../models/request/pago-request.model';
import { Observable } from 'rxjs';
import { PagoResponse } from '../models/response/pago-response.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
 private baseURLAdmin: string = `${environment.HOST}/admin`;
 private http = inject(HttpClient);
 constructor() { }

 createPagoByAdmin(pagoRequest:PagoRequest):Observable<PagoResponse>{
  return this.http.post<PagoResponse>(`${this.baseURLAdmin}/pago`,pagoRequest);
 }

}
