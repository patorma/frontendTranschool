import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCounterComponent } from './register-counter.component';

describe('RegisterCounterComponent', () => {
  let component: RegisterCounterComponent;
  let fixture: ComponentFixture<RegisterCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
