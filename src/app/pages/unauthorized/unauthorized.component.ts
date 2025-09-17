import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  template: `<p>unauthorized works!</p>`,
  styleUrl: './unauthorized.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedComponent { }
