import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecorridoService } from '../../../shared/services/recorrido.service';
import { RecorridoResponse } from '../../../shared/models/response/recorrido-response.model';
import { RecorridoRequest } from '../../../shared/models/request/recorrido-request.model';

@Component({
  selector: 'app-form-recorrido',
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
  templateUrl: './form-recorrido.component.html',
  styleUrl: './form-recorrido.component.css'
})
export class FormRecorridoComponent {
   recorridoForm: FormGroup;
   isEditing = false;
   recorridoId: number | null = null;

    private formBuilder = inject(FormBuilder);
    private recorridoService = inject(RecorridoService);
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private snackBar = inject(MatSnackBar);

    constructor(){
      this.recorridoForm =  this.formBuilder.group({
         origen: ['', [Validators.required]],
         destino: ['',[Validators.required]],
         descripcion: ['',[Validators.required]]
      })
    }

     ngOnInit(): void{
      this.activatedRoute.paramMap.subscribe(params =>{
        const idParam = params.get('id');
        if(idParam){
             this.isEditing = true;
             this.recorridoId = +idParam;
             this.loadRecorridoData(this.recorridoId);
        }

      })
     }

     loadRecorridoData(id: number) : void{
       this.recorridoService.findByIdRecorridoByAdmin(id).subscribe({
         next: (recorrido: RecorridoResponse) =>{
           this.recorridoForm.patchValue(recorrido);
         },
          error: () =>{
            this.snackBar.open('Error al cargar los datos del recorrido','Cerrar');
            this.router.navigate(['/pages/listar-recorridos']);
          }
       });
     }
  onSubmit(): void {
    if(this.recorridoForm.valid){
       if(this.isEditing && this.recorridoId){
        const requestData: RecorridoRequest = this.recorridoForm.value;
        this.recorridoService.updateRecorrido(this.recorridoId,requestData).subscribe({
          next: () =>{
            this.snackBar.open('El reccorrido fue actualizado exitosamente!!!','Cerrar');
            this.router.navigate(['/pages/listar-recorridos'])
          },
           error: () => this.snackBar.open('Error al actualizar el recorrido', 'Cerrar')
        });
       }else {
        const requestData: RecorridoRequest = this.recorridoForm.value;
        this.recorridoService.createRecorridoByAdmin(requestData).subscribe({
          next: () =>{
            this.snackBar.open('Recorrido creado con éxito!!!', 'Cerrar');
            this.router.navigate(['/pages/listar-recorridos']);
          },
          error: () => this.snackBar.open('Error al crear el recorrido!!!', 'Cerrar')
        });
       }
    }
  }


  controlHasError(controlName: string, errorName: string): boolean {
    return this.recorridoForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
