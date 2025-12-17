import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { EstudianteService } from '../../../shared/services/estudiante.service';
import { EstudianteResponse } from '../../../shared/models/response/estudiante-response.model';

@Component({
  selector: 'app-listar-estudiantes-admin',
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
    RouterLink
  ],
  templateUrl: './listar-estudiantes-admin.component.html',
  styleUrl: './listar-estudiantes-admin.component.css'
})
export class ListarEstudiantesAdminComponent {
  private estudianteService = inject(EstudianteService);

  estudiantes: EstudianteResponse[]= [];

    totalElements: number = 0;
    pageSize: number = 9;
    currentPage: number = 0;

      ngOnInit(): void{
      this.getEstudiantesByAdmin();
     }

     getEstudiantesByAdmin(){
       this.estudianteService.getAllEstudiantesByAdmin(this.currentPage,this.pageSize).subscribe(
        response => {
          this.estudiantes = response.content;
          this.totalElements =  response.totalElements;
        }
       )
     }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEstudiantesByAdmin();
  }

}
