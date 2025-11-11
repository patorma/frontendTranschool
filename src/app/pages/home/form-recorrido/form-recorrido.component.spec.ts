import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecorridoComponent } from './form-recorrido.component';

describe('FormRecorridoComponent', () => {
  let component: FormRecorridoComponent;
  let fixture: ComponentFixture<FormRecorridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecorridoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
