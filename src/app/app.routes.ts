import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {path:'',redirectTo: 'auth/sign-in',pathMatch:'full'},
  {//loadComnponent para lazy loading de componentes standalone
    //lo que hace es cargar el layout del modulo auth
    //y luego carga las rutas hijas que estan en pages.routes.ts
    //el layout es comun para todas las rutas hijas
    path: 'auth',
    loadComponent: () => import('./pages/auth/layout/layout.component').then((x) => x.LayoutComponent),
    loadChildren: () => import('./pages/pages.routes').then((x) =>x.pagesRoutes),
  },
  {
    path: 'pages',
    loadComponent: () => import('./pages/home/layout/layout.component').then((x) => x.LayoutComponent),
    loadChildren: () => import('./pages/pages.routes').then((x) => x.pagesRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  }

];
