import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FurgonResponse } from '../../../shared/models/response/furgon-response.model';
import { RegisterCounterComponent } from '../../../shared/components/register-counter/register-counter.component';

@Component({
  selector: 'app-furgon',
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
  templateUrl: './furgon.component.html' ,
  styleUrl: './furgon.component.css',

})
export class FurgonComponent {

  private authService = inject(AuthService);

  furgones: FurgonResponse[] = [];
   totalElements: number = 0;
   pageSize: number = 9;
   currentPage: number = 0;

     ngOnInit(): void{
      this.getFurgones();
  }

  getFurgones(){
    this.authService.getAllFurgones(this.currentPage,this.pageSize).subscribe(
      response => {
        this.furgones = response.content;
        this.totalElements = response.totalElements;
      }
    )
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getFurgones();
  }
}
