import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Role } from '../../../shared/models/enums/role.enum';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',

})
export class LayoutComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  get user(){
    return this.authService.getCurrentUser();
  }

  get isAdmin(){
    return this.user?.role === Role.ADMIN;
  }

  get isApoderado(){
    return this.user?.role === Role.APODERADO;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }

 }
