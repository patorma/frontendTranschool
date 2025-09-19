import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MensualidadService } from '../../../shared/services/mensualidad.service';
import { MensualidadResponse } from '../../../shared/models/response/mensualidad-response.model';
@Component({
  selector: 'app-mensualidad',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './mensualidad.component.html',
  styleUrl: './mensualidad.component.css',
})
export class MensualidadComponent {
   private mensualidadService = inject(MensualidadService);

   mensualidades: MensualidadResponse[] = [];
   totalElements: number = 0;
   pageSize: number = 9;
   currentPage: number = 0;

  ngOnInit(): void{
      this.getMensualidades();
  }

  getMensualidades(){
    this.mensualidadService.getAllMensualidadesByAdmin(this.currentPage,this.pageSize).subscribe(
      response =>{
         this.mensualidades = response.content;
         this.totalElements = response.totalElements;
      })
  }

    onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMensualidades();
  }

  deleteMensualidad(mensualidadId: number) {
  if (confirm('¿Estás seguro de eliminar esta mensualidad?')) {
    this.mensualidadService.deleteMensualidadByAdmin(mensualidadId).subscribe(() => {
      this.getMensualidades(); // refresca lista
    });
  }
  }

}
