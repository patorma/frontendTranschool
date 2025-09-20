import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/enums/role.enum';
import { map, catchError, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

 const allowedRoles = (route.data['role'] as string[]) || [];

  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/sign-in']);
    return false;
  }

  return authService.getUserData().pipe(
    map(user => {
      // convertimos el enum a string temporalmente
      let userRoleStr = user.role as unknown as string;

      // normalizamos si viene con "ROLE_"
      if (userRoleStr.startsWith('ROLE_')) {
        userRoleStr = userRoleStr.substring(5);
      }

      // convertimos de nuevo a enum
      let userRole = userRoleStr as unknown as Role;
      console.log('userRole:', userRole, typeof userRole);
      console.log('allowedRoles:', allowedRoles);
      if (allowedRoles.includes(userRole)) {

        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError(err => {
      console.error('Error obteniendo rol de usuario', err);
      router.navigate(['/auth/sign-in']);
      return of(false);
    })
  );
};
