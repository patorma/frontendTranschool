import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { RecorridoService } from '../../../shared/services/recorrido.service';
import { RecorridoResponse } from '../../../shared/models/response/recorrido-response.model';

@Component({
  selector: 'app-listar-recorridos',
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
  templateUrl: './listar-recorridos.component.html',
  styleUrl: './listar-recorridos.component.css'
})
export class ListarRecorridosComponent {

  private recorridoService = inject(RecorridoService);
  private router = inject(Router);
  recorridos: RecorridoResponse[] = [];
  totalElements: number = 0;
  pageSize: number = 9;
  currentPage: number = 0;

   ngOnInit(): void{
     this.getRecorridos();
   }

   getRecorridos(){
    this.recorridoService.getAllRecorridosByAdmin(this.currentPage,this.pageSize).subscribe(
      response =>{
        this.recorridos = response.content;
        this.totalElements = response.totalElements;
      }
    );
   }

    onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getRecorridos();
  }
}
