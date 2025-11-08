import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PagoService } from '../../../shared/services/Pago.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagoRequest } from '../../../shared/models/request/pago-request.model';

@Component({
  selector: 'app-pago',
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
  templateUrl: './pago.component.html',
  styleUrl: './pago.css',

})
export class PagoComponent {
   private route = inject(ActivatedRoute);
   private formBuilder = inject(FormBuilder);
   private router = inject(Router);
   private pagoService =inject(PagoService);
   private snackBar = inject(MatSnackBar);
   pagoForm!:FormGroup;
   mensualidadId: number | null = null;

   ngOnInit(): void{
     this.mensualidadId = Number(this.route.snapshot.paramMap.get('mensualidadId'));
     this.pagoForm = this.formBuilder.group({
      fechaPago:['',[Validators.required]],
      mensualidadId: [this.mensualidadId]
     })
   }

    onSubmit(): void{
      if(this.pagoForm.valid){
        const formValue = this.pagoForm.value;

        const fechaPagoFormatted = this.formatDate(formValue.fechaPago);
        const request: PagoRequest ={
          ...formValue,
          fechaPago: fechaPagoFormatted
        };
        this.pagoService.createPagoByAdmin(request).subscribe({
          next: (res) =>{
            this.snackBar.open('Pago registrado correctamente!!','Cerrar',{ duration: 3000 });
            this.router.navigate(['/pages/mesnsualiddaes-sin-pago'])
          },
            error: (err) => {
               this.snackBar.open('Error al registrar el pago ❌', 'Cerrar', { duration: 3000 });
              console.error(err);
            }
        })
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
  controlHasError(controlName: string, errorName: string): boolean {
    return this.pagoForm.get(controlName)?.hasError(errorName) ?? false;
  }

}
