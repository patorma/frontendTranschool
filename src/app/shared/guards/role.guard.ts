import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/enums/role.enum';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(authService.isAuthenticated());

  // roles permitidos en la ruta
  const allowedRoles = route.data['roles'] as Role[];
  const userRole = authService.getUserRole();

  if(authService.isAuthenticated() && userRole && allowedRoles.includes(userRole)){
    return true //si esta autenticado retorna true y puede acceder a la ruta
  } else {
    router.navigate(['/unauthorized']); //si no esta autenticado lo redirige al login
  }
  return false;

};
