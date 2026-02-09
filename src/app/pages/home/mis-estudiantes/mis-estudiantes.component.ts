import { Component, inject } from '@angular/core';
import { RegisterCounterComponent } from '../../../shared/components/register-counter/register-counter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../shared/services/estudiante.service';
import { EstudianteResponse } from '../../../shared/models/response/estudiante-response.model';

@Component({
  selector: 'app-mis-estudiantes',
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
    RegisterCounterComponent
  ],
  templateUrl: './mis-estudiantes.component.html',
  styleUrl: './mis-estudiantes.component.css'
})
export class MisEstudiantesComponent {
    private estudianteService = inject(EstudianteService);

    estudiantes: EstudianteResponse[] = [];

    totalElements: number = 0;
    pageSize: number = 9;
    currentPage: number = 0;

     ngOnInit(): void{
      this.getMyEstudiantes();
     }

     getMyEstudiantes(){
       this.estudianteService.getEstudiantesByApoderado(this.currentPage,this.pageSize)
         .subscribe(
          response =>{
            this.estudiantes = response.content
             this.totalElements = response.totalElements;
          }
         )
     }

      onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMyEstudiantes();
  }

}
