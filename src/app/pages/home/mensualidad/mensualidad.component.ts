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
   
}
