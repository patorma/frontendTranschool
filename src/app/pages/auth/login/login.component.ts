// login.component.ts

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthRequest } from '../../../shared/models/request/auth-request.model';
import { Role } from '../../../shared/models/enums/role.enum'; // Importa el enum si no lo tienes

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.showSnackBar('Inicio de sesión exitoso');
        //  AGREGAR LA LÓGICA DE NAVEGACIÓN AQUÍ
        this.authService.getUserData().subscribe(user => {
          // Normaliza el rol para la comparación
          let userRoleStr = user.role.startsWith('ROLE_') ? user.role.substring(5) : user.role;

          if (userRoleStr === 'ADMIN') {
            this.router.navigate(['/pages/mensualidades']);
          } else if (userRoleStr === 'APODERADO') {
            this.router.navigate(['/pages/my-mensualidades']);
          } else {
            // Maneja otros roles o roles desconocidos si es necesario
            this.router.navigate(['/pages/home']);
          }
        });
      },
      error: () => {
        this.showSnackBar('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
