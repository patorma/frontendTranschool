import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { EstudianteService } from '../../../shared/services/estudiante.service';
import { EstudianteRequest } from '../../../shared/models/request/estudiante-request.model';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-form-my-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,//necesario importarlo para construir un formulario con esto
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink,
     MatNativeDateModule,
    MatDatepickerModule
  ],
  templateUrl: './form-my-estudiantes.component.html',
  styleUrl: './form-my-estudiantes.component.css'
})
export class FormMyEstudiantesComponent {
  estudianteForm: FormGroup;
  private formBuilder = inject(FormBuilder);
  private estudianteService = inject(EstudianteService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor(){
    this.estudianteForm = this.formBuilder.group({
       nombres: ['',[Validators.required]],
       apellidos: ['',[Validators.required]],
       fechaNacimiento:['',[Validators.required]],
       colegio:['',[Validators.required]],
       email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    })
  }

   onSubmit() {
    if (this.estudianteForm.valid){
      const formValue = this.estudianteForm.value;
      const fechaVencimientoFormatted = this.formatDate(formValue.fechaVencimiento);

       const request: EstudianteRequest = {
            ...formValue,
            fechaVencimiento: fechaVencimientoFormatted
       };

       this.estudianteService.crearEstudianteByApoderado(request).subscribe({
        next: (res) =>{
          this.snackBar.open('Estudiante creado correctamente ✅', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/pages/my-estudiantes'])
        },
         error: (err) => {
        this.snackBar.open('Error al registrar al estudiante ❌', 'Cerrar', { duration: 3000 });
        console.error(err);
      }
       }

       );
    }
   }

   formatDate(date: Date | string): string {
  if (!date) return '';

  const d = new Date(date);
  const day = ('0' + d.getDate()).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

 controlHasError(controlName: string, errorName: string): boolean {
    return this.estudianteForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
