import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AuthRequest } from '../models/request/auth-request.model';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/response/auth-response.model';
import { SignupRequest } from '../models/request/signup-request.model';
import { Profile } from '../models/response/profile-response.model';
import { Role } from '../models/enums/role.enum';
import { PaginatedResponse } from '../models/response/paginated-response.model';
import { DeleteResponse } from '../models/response/delete-response.model';
import { PaginatedFurgonResponse } from '../models/response/paginated-furgon-response.model';
import { FurgonRequest } from '../models/request/furgon-request.model';
import { FurgonResponse } from '../models/response/furgon-response.model';
import { PaginatedAsignacionEstudianteResponse } from '../models/response/paginated-asignacion-estudiante-response.model';
import { AsignacionEstudianteRequest } from '../models/request/asignacion-estudiante-request.model';
import { AsignacionEstudianteResponse } from '../models/response/asignacion-estudiante-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = `${environment.HOST}/auth`;
  private baseURLAdmin: string = `${environment.HOST}/admin`
  private http = inject(HttpClient);

  private storageService = inject(StorageService);


  // operador tap de RxJS. El operador tap se usa para ejecutar
  // efectos secundarios,
  //como guardar los datos de autenticación en el local storage,
  // sin modificar los datos que se están pasando a través del
  // observable.
  //toma la ruta base que le entrega el backend y a partir de esa
  // ruta base
  //va enviar,
  // utilizando el http, va enviar la informacion al login
  //que es el inicio de sesión y al mismo tiempo ejecuta un
  // segunbdo efecto que es que esa informacion que si el inicio
  //  de sesion es exitoso  le va a pedir guardar esa informacion
  //  en el localstore del backend
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/sign-in`,authRequest).pipe(
      tap(response => this.storageService.setAuthData(response))
    )
  }

  //aca es donde se capta los valores del formulario para registrar usuario
  crear(signupRequest: SignupRequest): Observable<Profile>{
    return this.http.post<Profile>(`${this.baseURL}/crear`, signupRequest);
  }

  crearTransportista(signupRequest: SignupRequest): Observable<Profile>{
    return this.http.post<Profile>(`${this.baseURLAdmin}/sign-up`, signupRequest);
  }

  crearFurgon(furgonRequest: FurgonRequest):Observable<FurgonResponse>{
    return this.http.post<FurgonResponse>(`${this.baseURLAdmin}/furgon`,furgonRequest);
  }



  logout(): void {
      this.storageService.clearAuthData();

  }


  isAuthenticated(): boolean {
    //pregunta si hay data en el localstore entonces esto retornara un verdadero y si no hay data retornara un falso
    return this.storageService.getAuthData() !== null;
  }


  //recupera informacion del usuario que se almaceno en el localstore
  getCurrentUser(): Profile | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.user : null;
  }
  //este metodo es para obtener la informacion del usuario que esta logeado
  //desde el backend
 getUserData(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseURL}/me`);
  }

  getAllUsers(page: number,size:number):Observable<PaginatedResponse>{
    //le envia los parametros de paginacion
       const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedResponse>(`${this.baseURLAdmin}/usuarios/page`,{ params });
  }

  getAllApoderados(page: number,size:number):Observable<PaginatedResponse>{
     //le envia los parametros de paginacion
       const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedResponse>(`${this.baseURLAdmin}/usuarios/apoderados/page`,{ params });
  }

  //lista todos los furgones
  getAllFurgones(page: number,size:number):Observable<PaginatedFurgonResponse>{
      const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())

      return this.http.get<PaginatedFurgonResponse>(`${this.baseURLAdmin}/furgones/page`,{ params });
  }

  getAllTransportistas(page: number,size:number):Observable<PaginatedResponse>{
       const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedResponse>(`${this.baseURLAdmin}/usuarios/transportistas/page`,{params});
  }
  getAllTransportistasSinFurgon(page: number,size:number):Observable<PaginatedResponse>{
     //le envia los parametros de paginacion
       const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
       return this.http.get<PaginatedResponse>(`${this.baseURLAdmin}/usuarios-transportistas/sin-furgon/page`,{params});
  }

  getAllTransportistasConFurgon(page:number,size:number): Observable<PaginatedResponse>{
     const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      return this.http.get<PaginatedResponse>(`${this.baseURLAdmin}/usuarios-transportistas/con-furgon/page`,{params});
  }

  //ver estudiantes de un furgon
getEstdiantesbyFurgon(id:number,page: number,size:number,):Observable<PaginatedAsignacionEstudianteResponse>{
   const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
    return this.http.get<PaginatedAsignacionEstudianteResponse>(`${this.baseURLAdmin}/asigFurgon/page/idFurgon?id=${id}`,{params})
}

//se crea la asignacion del estudiante
 createAsignacion(asignacionEstudianteRequest:AsignacionEstudianteRequest):Observable<AsignacionEstudianteResponse>{
  return this.http.post<AsignacionEstudianteResponse>(`${this.baseURLAdmin}/asignacion`,asignacionEstudianteRequest);
 }

   findByIdUser(id:number):Observable<Profile>{
      return this.http.get<Profile>(`${this.baseURLAdmin}/findUser/${id}`);
   }


   updateUser(id: number, signupRequest:SignupRequest): Observable<Profile>{
      return this.http.put<Profile>(`${this.baseURLAdmin}/user/${id}`,signupRequest);
   }


   deleteUserByAdmin(id:number): Observable<DeleteResponse>{
     return this.http.delete<DeleteResponse>(`${this.baseURLAdmin}/user/eliminar/${id}`)
   }

  // getUserRole(): Role | null {


  // }
}
