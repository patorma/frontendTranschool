import { Routes } from "@angular/router";
import { UsersComponent } from "./home/users/users.component";
import { roleGuard } from "../shared/guards/role.guard";
import { Role } from "../shared/models/enums/role.enum";
import { MensualidadComponent } from "./home/mensualidad/mensualidad.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { MisMensualidadesComponent } from "./home/mis-mensualidades/mis-mensualidades.component";



export const pagesRoutes: Routes = [
  { path: 'sign-in', component: LoginComponent },
  {path: 'crear', component: RegisterComponent },
   {
    path: 'users',
    component: UsersComponent,
    canActivate: [roleGuard],
    data:{role:['ADMIN']}
   },
   {
    path: 'mensualidades',
    component: MensualidadComponent,
    canActivate: [roleGuard],
    data:{role: ['ADMIN']}
   },
   {
    path:'my-mensualidades',
    component: MisMensualidadesComponent,
    canActivate: [roleGuard],
    data: {role: ['APODERADO']}
   }
];
