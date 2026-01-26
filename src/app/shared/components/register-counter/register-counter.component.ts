import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register-counter',
  standalone: true,
  imports: [],
  templateUrl: './register-counter.component.html',
  styleUrl: './register-counter.component.css'
})
export class RegisterCounterComponent {

  @Input() total = 0;
  @Input() label = '';
}
