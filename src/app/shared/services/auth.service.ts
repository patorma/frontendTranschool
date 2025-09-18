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
