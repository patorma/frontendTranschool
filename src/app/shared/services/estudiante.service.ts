import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedEstudianteResponse } from '../models/response/paginated-estudiante-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EstudianteRequest } from '../models/request/estudiante-request.model';
import { EstudianteResponse } from '../models/response/estudiante-response.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
   private baseURLAdmin:string = `${environment.HOST}/admin`;
   private baseURLApoderado: string = `${environment.HOST}/estudiantes`;
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

   //el apoderado visualiza sus estudiantes registrados
  getEstudiantesByApoderado(page: number,size:number):Observable<PaginatedEstudianteResponse>{
          const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedEstudianteResponse>(`${this.baseURLApoderado}/apoderado/estudiantes/page`,{params});

  }

  //el apoderado ingresa su hijos
  crearEstudianteByApoderado(estudianteRequest: EstudianteRequest): Observable<EstudianteResponse>{
    return this.http.post<EstudianteResponse>(`${this.baseURLApoderado}/estudiante`,estudianteRequest);
  }
}
