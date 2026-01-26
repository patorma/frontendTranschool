import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Profile } from '../../../shared/models/response/profile-response.model';
import { RegisterCounterComponent } from '../../../shared/components/register-counter/register-counter.component';

@Component({
  selector: 'app-user-transportista',
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
  templateUrl: './user-transportista.component.html',
  styleUrl: './user-transportista.component.css',
})
export class UserTransportistaComponent {

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
     this.authService.getAllTransportistasSinFurgon(this.currentPage,this.pageSize).subscribe(
      response => {
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
