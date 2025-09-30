import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MensualidadService } from '../../../shared/services/mensualidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensualidadRequest } from '../../../shared/models/request/mensualidad-request.model';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-form-mensualidad',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  templateUrl: './form-mensualidad.component.html',
  styleUrl: './form-mensualidad.component.css',

})
export class FormMensualidadComponent {
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private mensualidadService = inject(MensualidadService);
  private snackBar = inject(MatSnackBar);
   mensualidadForm!: FormGroup;
   usuarioId: number | null = null;

   constructor(){

   }
   ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('usuarioId'));

       this.mensualidadForm = this.formBuilder.group({
      monto: ['',[Validators.required,Validators.min(2)]],
      fechaVencimiento:['',[Validators.required]],
      usuarioId: [this.usuarioId]
    })
   }

   onSubmit() {
  if (this.mensualidadForm.valid) {
    const formValue = this.mensualidadForm.value;

    // Convertimos fechaVencimiento a dd-MM-yyyy
    const fechaVencimientoFormatted = this.formatDate(formValue.fechaVencimiento);

    const request: MensualidadRequest = {
      ...formValue,
      fechaVencimiento: fechaVencimientoFormatted
    };

    this.mensualidadService.createMensualidadByAdmin(request).subscribe({
      next: (res) => {
        this.snackBar.open('Mensualidad creada correctamente ✅', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/pages/mensualidades']);
      },
      error: (err) => {
        this.snackBar.open('Error al crear mensualidad ❌', 'Cerrar', { duration: 3000 });
        console.error(err);
      }
    });
  }
}

// Función para convertir Date a dd-MM-yyyy
formatDate(date: Date | string): string {
  if (!date) return '';

  const d = new Date(date);
  const day = ('0' + d.getDate()).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}


}
