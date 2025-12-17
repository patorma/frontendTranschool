import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedEstudianteResponse } from '../models/response/paginated-estudiante-response';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
   private baseURLAdmin:string = `${environment.HOST}/admin`;
   private http = inject(HttpClient);

  constructor() { }
   //consumir servicios del backend de un apoderado pendiente

   getAllEstudiantesByAdmin(page: number,size:number):Observable<PaginatedEstudianteResponse>{
     //le envia los parametros de paginacion
      const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedEstudianteResponse>(`${this.baseURLAdmin}/estudiantes/page`,{ params })
   }


}
