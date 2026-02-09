import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMyEstudiantesComponent } from './form-my-estudiantes.component';

describe('FormMyEstudiantesComponent', () => {
  let component: FormMyEstudiantesComponent;
  let fixture: ComponentFixture<FormMyEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMyEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMyEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
