import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { AsignacionEstudianteResponse } from '../../../shared/models/response/asignacion-estudiante-response.model';

@Component({
  selector: 'app-listar-estudiantes-by-furgon',
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
  templateUrl: './listar-estudiantes-by-furgon.component.html',
  styleUrl: './listar-estudiantes-by-furgon.component.css'
})
export class ListarEstudiantesByFurgonComponent {
   private authService = inject(AuthService);
   private route = inject(ActivatedRoute);
     estudiantesByFurgon: AsignacionEstudianteResponse[] =[];
       totalElements: number = 0;
       pageSize: number = 9;
       currentPage: number = 0;
       idFurgon:number | null = null;

     ngOnInit(): void{
      this.getEstudiantesByFurgon();
     }

     getEstudiantesByFurgon(){
      this.idFurgon = Number(this.route.snapshot.paramMap.get('idFurgon'));
      console.log(this.idFurgon)
      this.authService.getEstdiantesbyFurgon(this.idFurgon,this.currentPage,this.pageSize).subscribe(
         response => {
           this.estudiantesByFurgon = response.content;
          this.totalElements =  response.totalElements;
          console.log(this.estudiantesByFurgon)
         }

      )
     }

     onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this. getEstudiantesByFurgon();
  }
}
