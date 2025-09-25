import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { Profile } from '../../../shared/models/response/profile-response.model';
import { SignupRequest } from '../../../shared/models/request/signup-request.model';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
     CommonModule,
    ReactiveFormsModule,//necesario importarlo para construir un formulario con esto
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',

})
export class FormUserComponent {
  userForm: FormGroup;
  isEditing = false;
  userId: number | null = null;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.userForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      comuna: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // Contraseña y confirmación solo son obligatorias para crear
      password: [''],
      confirmPassword: ['']
    }, {
      validators: passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Lee el parámetro de la URL
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditing = true;
        this.userId = +idParam;
        this.loadUserData(this.userId);

        // Desactiva los validadores de la contraseña para el modo de edición
        this.userForm.get('password')?.setValidators(null);
        this.userForm.get('confirmPassword')?.setValidators(null);
      } else {
        // En modo de creación, la contraseña es obligatoria
        this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(4)]);
        this.userForm.get('confirmPassword')?.setValidators([Validators.required]);
      }
      // Actualiza la validación del formulario
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  loadUserData(id: number): void {
    this.authService.findByIdUser(id).subscribe({
      next: (user: Profile) => {
        // Usa patchValue para rellenar solo los campos existentes
        this.userForm.patchValue(user);
        // // Desactiva el campo de email en modo de edición para que no se pueda cambiar
        // this.userForm.get('email')?.disable();
      },
      error: () => {
        this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar');
        this.router.navigate(['/pages/users']);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEditing && this.userId) {
        // Lógica de actualización
        const requestData: SignupRequest = this.userForm.value;

        this.authService.updateUser(this.userId, requestData).subscribe({
          next: () => {
            this.snackBar.open('Usuario actualizado con éxito', 'Cerrar');
            this.router.navigate(['/pages/users']);
          },
          error: () => this.snackBar.open('Error al actualizar el usuario', 'Cerrar')
        });
      } else {
        // Lógica de creación
        const requestData: SignupRequest = this.userForm.value;
        this.authService.crearTransportista(requestData).subscribe({
          next: () => {
            this.snackBar.open('Usuario creado con éxito', 'Cerrar');
            this.router.navigate(['/pages/users']);
          },
          error: () => this.snackBar.open('Error al crear el usuario', 'Cerrar')
        });
      }
    }
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.userForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
