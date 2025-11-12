import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedRecorridoResponse } from '../models/response/paginated-recorrido-response';
import { RecorridoRequest } from '../models/request/recorrido-request.model';
import { RecorridoResponse } from '../models/response/recorrido-response.model';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

  private baseURLTransportista: string = `${environment.HOST}/recorridos/my-recorridos/page`
  private baseURLAdmin: string = `${environment.HOST}/admin`;

   private http = inject(HttpClient);

  constructor() { }

  getAllRecorridosByAdmin(page:number,size: number):Observable<PaginatedRecorridoResponse>{
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<PaginatedRecorridoResponse>(`${this.baseURLAdmin}/recorridos/page`,{params});
  }

  createRecorridoByAdmin(recorridoRequest: RecorridoRequest):Observable<RecorridoResponse>{

     return this.http.post<RecorridoResponse>(`${this.baseURLAdmin}/recorrido`,recorridoRequest);
  }

  updateRecorrido(id:number,recorridoRequest: RecorridoRequest):Observable<RecorridoResponse>{
     return this.http.put<RecorridoResponse>(`${this.baseURLAdmin}/actualizar/recorrido/${id}`,recorridoRequest);
  }

  findByIdRecorridoByAdmin(id:number): Observable<RecorridoResponse>{
    return this.http.get<RecorridoResponse>(`${this.baseURLAdmin}/recorrido/${id}`);
  }
}
