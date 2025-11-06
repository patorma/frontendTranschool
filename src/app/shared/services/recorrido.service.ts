import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

  private baseURLTransportista: string = `${environment.HOST}/recorridos/my-recorridos/page`
  private baseURLAdmin: string = `${environment.HOST}/admin`;

  
  constructor() { }

}
