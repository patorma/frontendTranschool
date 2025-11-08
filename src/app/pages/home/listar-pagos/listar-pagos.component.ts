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
import { PagoService } from '../../../shared/services/Pago.service';
import { PagoResponse } from '../../../shared/models/response/pago-response.model';

@Component({
  selector: 'app-listar-pagos',
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
  templateUrl: './listar-pagos.component.html',
  styleUrl: './listar-pagos.component.css'
})
export class ListarPagosComponent {
    private pagoService = inject(PagoService);

    pagos: PagoResponse[] =[];
    totalElements: number = 0;
    pageSize: number = 9;
    currentPage: number = 0;

     ngOnInit(): void{
      this.getPagos();
     }

     getPagos(){
      this.pagoService.getAllPagosByAdmin(this.currentPage,this.pageSize).subscribe(
        response =>{
          this.pagos = response.content;
          this.totalElements =  response.totalElements;
        }
      )
     }


    onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPagos();
  }

}
