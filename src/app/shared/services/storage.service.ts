import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/response/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private authKey=  'furgones_auth';


  constructor() { }

  setAuthData(data: AuthResponse): void{
    //JSON.stringify -> Convierte un objeto a un string
    //O EN ESTE CASO A UN JSON
    localStorage.setItem(this.authKey, JSON.stringify(data) );
  }

  //recupera la informacion pregunta si hay contenido
//y transforma a formato json
  getAuthData():  AuthResponse | null{
    const data = localStorage.getItem(this.authKey);
    return data ? JSON.parse(data): null;
  }

  // al cerrar sesion se limpia el localstore
  clearAuthData(): void{
    localStorage.removeItem(this.authKey);
  }
}
