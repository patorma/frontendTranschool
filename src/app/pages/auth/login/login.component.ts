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

  //se construye un formulario mediante Builder
  private formBuilder = inject(FormBuilder);
  //inyeccion de dependencia de authservice
  private authService = inject(AuthService);
  //snackBar para mostrar mensajes
  private snackBar = inject(MatSnackBar);
    // se inyecta para hacer la navegacion
  private router = inject(Router);

  constructor() {
    //se construye el objeto loginform que tiene la estructura del formulario en el constructor
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  //se toma todos los mensajes de errores
  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onLogin() {
    //pregunto si la informacion del formulario es incorrecta
    // se muestra los mensajes de error
    if (this.loginForm.invalid) {
      return;
    }
    // se toma valores de las credenciales osea se toma todos los valores del formulario y me susbcribo
    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: ()=>{
        this.showSnackBar('Inicio de sesión exitoso');
        this.router.navigate(['/pages/mensualidades']);
      },
      error: ()=>{
        this.showSnackBar('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      }
    })
  }
   //metodo para mostrar mensajes
   //se crea un metodo privado para mostrar mensajes
   //se le pasa un mensaje de tipo string
   //y se le configura el snackBar
   //el snackBar es un componente de angular material que muestra mensajes emergentes
   //el snackBar tiene una duracion de 3 segundos
   //y un boton para cerrar el mensaje
   //este metodo se usa en el onLogin
   //cuando el inicio de sesion es exitoso o cuando hay un error en el inicio de sesion
   //se muestra el mensaje correspondiente
   //y se cierra automaticamente despues de 3 segundos  
    private showSnackBar(message: string): void {
      this.snackBar.open(message,'Cerrar',{
        duration:3000
      });
    }

}
