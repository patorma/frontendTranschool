import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { SignupRequest } from '../../../shared/models/request/signup-request.model';

@Component({
  selector: 'app-register',
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
  templateUrl:'./register.component.html',
  styleUrl: './register.component.css',

})
export class RegisterComponent {
  registerForm: FormGroup;
  //FormBuilder construye ese formulario
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
//se construye en el constructor  el formulario
 constructor(){
  this.registerForm = this.formBuilder.group({
    nombres: ['',[Validators.required]],
    apellidos: ['',[Validators.required]],
    comuna: ['',[Validators.required]],
    telefono: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password: ['',[Validators.required, Validators.minLength(4)]],
    confirmPassword: ['',[Validators.required]],
  },{
    validators: passwordMatchValidator

  });
 }

  controlHasError(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error);
  }

   onSubmit() {
    //se pregunta si todo lo que se coloco en el formulario
    //es valido
    if (this.registerForm.valid) {
      //se toma toda la data que viene del formulario
      //y lo asigno a la constante const signupRequest: SignupRequest
      const signupRequest: SignupRequest = this.registerForm.value;
      this.authService.crear(signupRequest).subscribe({
        next: () => {
          this.showSnackBar('Registro exitoso');
          this.router.navigate(['/auth/sign-in']);
        },
        error: () => {
          this.showSnackBar('Error al registrarse, por favor intente de nuevo');
        }
      });
    }
  }

  //TODO: implementar luego en un util porque se utiliza en varios componentes
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  }
