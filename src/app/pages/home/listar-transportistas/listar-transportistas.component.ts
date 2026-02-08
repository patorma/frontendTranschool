import { Component, inject } from '@angular/core';
import { RegisterCounterComponent } from '../../../shared/components/register-counter/register-counter.component';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { Profile } from '../../../shared/models/response/profile-response.model';

@Component({
  selector: 'app-listar-transportistas',
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
  templateUrl: './listar-transportistas.component.html',
  styleUrl: './listar-transportistas.component.css'
})
export class ListarTransportistasComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  transportistas: Profile[] = [];
   totalElements: number = 0;
  pageSize: number = 9;
  currentPage: number = 0;

  ngOnInit(): void {
    this.getTransportistas()

  }

  getTransportistas():void {
    this.authService.getAllTransportistas(this.currentPage,this.pageSize).subscribe(
      response =>{
           this.transportistas = response.content;
           this.totalElements = response.totalElements;
      }
    )
  }

    onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getTransportistas();
  }

}
