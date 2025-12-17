import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

//los interceptor son los que colocan informacion dentro de un request para enviar o para el momento de recibir .
//En este caso este interceptor cada vez que los servicios del angular hacen pedidos al backend este interceptor tome esta peticion ,clone esa peticion y va a colocar el token o tokens de seguridad
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
 const storageService = inject(StorageService);
  const authData = storageService.getAuthData(); // Obtener los datos de autenticación

  //cuando viene esta url no se envia el token y los headers
  // y se evita mandar un token expirado
  if(req.url.includes('/auth/sign-in')){
       return next(req);
  }
  if(authData && authData.token){
        // Si hay un token de autenticación, clonar la solicitud y agregar el encabezado de autorización
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.token}`)
    });
    return next(authReq);
  }
     // Si no hay datos de autenticación, pasar la solicitud sin modificar
  return next(req);
};
