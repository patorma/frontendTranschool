import { Routes } from "@angular/router";
import { UsersComponent } from "./home/users/users.component";
import { roleGuard } from "../shared/guards/role.guard";
import { Role } from "../shared/models/enums/role.enum";
import { MensualidadComponent } from "./home/mensualidad/mensualidad.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";



export const pagesRoutes: Routes = [
  { path: 'sign-in', component: LoginComponent },
  {path: 'crear', component: RegisterComponent },
   {
    path: 'users',
    component: UsersComponent,
    canActivate: [roleGuard],
    data:{roles: [Role.ADMIN]}
   },
   {
    path: 'mensualidades',
    component: MensualidadComponent,
    canActivate: [roleGuard],
    data:{roles: [Role.ADMIN, Role.APODERADO]}
   }
];
