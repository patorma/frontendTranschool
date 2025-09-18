import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/enums/estado.enum';
import { MensualidadRequest } from '../models/request/mensualidad-request.model';
import { MensualidadResponse } from '../models/response/mensualidad-response.model';
import { DeleteResponse } from '../models/response/delete-response.model';
import { ReactivaResposne } from '../models/response/reactiva-response.model';
import { PaginatedMensualidadResponse } from '../models/response/paginated-mensualidad-response.model';

@Injectable({
  providedIn: 'root'
})
export class MensualidadService {

  private baseURLApoderado: string = `${environment.HOST}/mensualidades/my-mensualidades`;
  private baseURLAdmin: string = `${environment.HOST}/admin`
  private http = inject(HttpClient);

  constructor() { }

  getAllMensualidadesByApoderado(page: number,size:number):Observable< PaginatedMensualidadResponse>{
    //le envia los parametros de paginacion
      const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedMensualidadResponse>(`${this.baseURLApoderado}/page`,{ params })
  }

  getAllMensualidadesByAdmin(page: number,size:number):Observable<PaginatedMensualidadResponse>{
    //le envia los parametros de paginacion
      const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedMensualidadResponse>(`${this.baseURLAdmin}/mensualidades/page`,{ params })
  }

  findByEstadoMensualidadesAdmin(state_mensualidad:Estado, page: number, size: number): Observable<PaginatedMensualidadResponse>{
    const params = new HttpParams()
    .set('state_mensualidad', state_mensualidad)
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<PaginatedMensualidadResponse>(`${this.baseURLAdmin}/mensualidades/page/state`, { params });
  }

  findByIdUserMensualidadesAdmin(id:number, page: number, size: number): Observable<PaginatedMensualidadResponse>{
    const params = new HttpParams()
    .set('id', id.toString())
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<PaginatedMensualidadResponse>(`${this.baseURLAdmin}/mensualidades/page/id-user`, { params });
  }

  //Metodo que el admin registra la mensualidad que debe pagar el apoderado
  //este metodo recibe un objeto de tipo mensualidad request
  //y retorna un objeto de tipo mensualidad response
  createMensualidadByAdmin(mensualidadRequest:MensualidadRequest): Observable<MensualidadResponse>{
    return this.http.post<MensualidadResponse>(`${this.baseURLAdmin}/mensualidad`,mensualidadRequest)
  }

  //Metodo que el admin actualiza la mensualidad que debe pagar el apoderado
  updateMensualidadByAdmin(id: number, mensualidadRequest:MensualidadRequest): Observable<MensualidadResponse>{
    return this.http.put<MensualidadResponse>(`${this.baseURLAdmin}/mensualidad/${id}`, mensualidadRequest);
  }

  deleteMensualidadByAdmin(id: number):Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(`${this.baseURLAdmin}/mensualidad/eliminar/${id}`)
  }

  reactivaMensualidadByAdmin(id: number):Observable<ReactivaResposne>{
    return this.http.post<ReactivaResposne>(`${this.baseURLAdmin}/mensualidad/reactiva/${id}`,{});
  }

}
