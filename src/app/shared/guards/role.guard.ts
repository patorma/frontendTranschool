import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/enums/role.enum';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  // roles permitidos en la ruta
  const allowedRoles = route.data['roles'] as Role[];
  const userRole = authService.getUserRole();
  console.log('userRole:', userRole, 'allowedRoles:', allowedRoles)

  if(!authService.isAuthenticated()){
    router.navigate(['/auth/sign-in']);
    return false;
  }
  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }

     // if(authService.isAuthenticated() && userRole && allowedRoles.includes(userRole)){
  //   return true //si esta autenticado retorna true y puede acceder a la ruta
  // } else {
  //   router.navigate(['/auth/sign-in']); //si no esta autenticado lo redirige al login
  //    return false;
  // }


};
