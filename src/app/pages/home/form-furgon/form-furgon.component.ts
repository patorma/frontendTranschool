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
import { AuthService } from '../../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FurgonRequest } from '../../../shared/models/request/furgon-request.model';

@Component({
  selector: 'app-form-furgon',
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
  templateUrl: './form-furgon.component.html',
  styleUrl: './form-furgon.component.css',

})
export class FormFurgonComponent {
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  furgonForm!: FormGroup;
  usuarioTransportistaId: number | null = null;

  ngOnInit(): void {
    this.usuarioTransportistaId = Number(this.route.snapshot.paramMap.get('transportistaId'));
    this.furgonForm = this.formBuilder.group({
      patente: ['',[Validators.required,Validators.min(4)]],
      descripcion: ['',[Validators.required]],
      usuarioTransportistaId: [this.usuarioTransportistaId]
    })
  }

   onSubmit(){
    if(this.furgonForm.valid){
      const formValue = this.furgonForm.value;

      const furgonRequest: FurgonRequest = {
        ...formValue
      };
      this.authService.crearFurgon(furgonRequest).subscribe(
        {
          next: (res) =>{
             this.snackBar.open('El furgon fue creado correctamente','Cerrar',{ duration: 3000 });
             this.router.navigate(['/pages/listar-furgones']);
          },
          error: (err) =>{
            this.snackBar.open('Error al registrar el furgon','Cerrar',{ duration: 3000 })
             console.error(err);
          }
        }
      )
    }
   }
    controlHasError(controlName: string, errorName: string): boolean {
    return this.furgonForm.get(controlName)?.hasError(errorName) ?? false;
  }
 }
