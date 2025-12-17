import { Routes } from "@angular/router";
import { UsersComponent } from "./home/users/users.component";
import { roleGuard } from "../shared/guards/role.guard";
import { Role } from "../shared/models/enums/role.enum";
import { MensualidadComponent } from "./home/mensualidad/mensualidad.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { MisMensualidadesComponent } from "./home/mis-mensualidades/mis-mensualidades.component";
import { FormMensualidadComponent } from "./home/form-mensualidad/form-mensualidad.component";
import { FormUserComponent } from "./home/form-user/form-user.component";
import { UserApoderadoComponent } from "./home/user-apoderado/user-apoderado.component";
import { UserTransportistaComponent } from "./home/user-transportista/user-transportista.component";
import { FurgonComponent } from "./home/furgon/furgon.component";
import { FormFurgonComponent } from "./home/form-furgon/form-furgon.component";
import { UserTransportistaConFurgonComponent } from "./home/user-transportista-con-furgon/user-transportista-con-furgon.component";
import { MensualidadSinPagoComponent } from "./home/mensualidad-sin-pago/mensualidad-sin-pago.component";
import { PagoComponent } from "./home/pago/pago.component.";
import { ListarPagosComponent } from "./home/listar-pagos/listar-pagos.component";
import { ListarRecorridosComponent } from "./home/listar-recorridos/listar-recorridos.component";
import { FormRecorridoComponent } from "./home/form-recorrido/form-recorrido.component";
import { ListarEstudiantesAdminComponent } from "./home/listar-estudiantes-admin/listar-estudiantes-admin.component";



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
    path:'formuser',
    component: FormUserComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path:'formuser/:id',
    component: FormUserComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path:'formrecorrido',
    component: FormRecorridoComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path:'formrecorrido/:id',
    component: FormRecorridoComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path:'listar-apoderados',
    component: UserApoderadoComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path: 'listar-recorridos',
    component: ListarRecorridosComponent,
    canActivate:[roleGuard],
    data:{role:['ADMIN']}
   },
    {// listar estudiantes asociados a un apoderado by admin
      path: 'listar-estdiantes-admin',
      component: ListarEstudiantesAdminComponent,
       canActivate:[roleGuard],
       data:{role:['ADMIN']}
    },
   {
    path: 'listar-furgones',
    component: FurgonComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },

   {
    path: 'listar-transportistas',
    component: UserTransportistaComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },

   {
    path: 'listar-transportistas-con-furgon',
    component: UserTransportistaConFurgonComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path: 'mensualidades',
    component: MensualidadComponent,
    canActivate: [roleGuard],
    data:{role: ['ADMIN']}
   },
   {
    path:'mesnsualiddaes-sin-pago',
    component:MensualidadSinPagoComponent,
     canActivate: [roleGuard],
    data:{role: ['ADMIN']}
   },
   {
     path:'lista-mensualidades',
     component: ListarPagosComponent,
     canActivate: [roleGuard],
     data:{role: ['ADMIN']}
   },
   {
    path: 'formmensualidad',
    component: FormMensualidadComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },

   {
    path: 'formfurgon',
    component: FormFurgonComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path: 'formfurgon/:id',
    component: FormFurgonComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path: 'formmensualidad/:id',
    component: FormMensualidadComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },

   {
     path:'pago/:mensualidadId',
     component: PagoComponent,
    canActivate: [roleGuard],
    data: {role: ['ADMIN']}
   },
   {
    path:'my-mensualidades',
    component: MisMensualidadesComponent,
    canActivate: [roleGuard],
    data: {role: ['APODERADO']}
   }
];
