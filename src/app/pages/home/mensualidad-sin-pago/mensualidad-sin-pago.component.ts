import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MensualidadService } from '../../../shared/services/mensualidad.service';
import { MensualidadResponse } from '../../../shared/models/response/mensualidad-response.model';
import { RegisterCounterComponent } from '../../../shared/components/register-counter/register-counter.component';

@Component({
  selector: 'app-mensualidad-sin-pago',
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
    RegisterCounterComponent
  ],
  templateUrl: './mensualidad-sin-pago.component.html',
  styleUrl: './mensualidad-sin-pago.component.css',

})
export class MensualidadSinPagoComponent {
   private mensualidadService = inject(MensualidadService);

   mensualidades: MensualidadResponse[] = [];
   totalElements: number = 0;
   pageSize: number = 9;
   currentPage: number = 0;

  ngOnInit(): void{
      this.getMensualidadesSinPago();
  }

  getMensualidadesSinPago(){
    this.mensualidadService.getAllMensualidadesByAdminSinPago(this.currentPage,this.pageSize).subscribe(
      response =>{
         this.mensualidades = response.content;
         this.totalElements = response.totalElements;
      })
  }

    onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMensualidadesSinPago();
  }
}
