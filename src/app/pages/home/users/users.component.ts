import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Profile } from '../../../shared/models/response/profile-response.model';
import { DeleteResponse } from '../../../shared/models/response/delete-response.model';
import { RegisterCounterComponent } from '../../../shared/components/register-counter/register-counter.component';

@Component({
  selector: 'app-users',
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
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',

})
export class UsersComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

    //se tiene como arreglo porque se va a listar un catalogo de users
  users: Profile[] = [];
  totalElements: number = 0;
  pageSize: number = 9;
  currentPage: number = 0;

   ngOnInit(): void{
    this.getUsers();
   }

   getUsers(){
     this.authService.getAllUsers(this.currentPage,this.pageSize).subscribe(
      response =>{
        this.users = response.content;
        this.totalElements = response.totalElements;
       });
   }

   onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  deleteUser(userId: number) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    this.authService.deleteUserByAdmin(userId).subscribe(() => {
      this.getUsers(); // refresca lista
    });
  }
  }
 }
