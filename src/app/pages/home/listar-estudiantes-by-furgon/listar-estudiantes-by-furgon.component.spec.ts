import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstudiantesByFurgonComponent } from './listar-estudiantes-by-furgon.component';

describe('ListarEstudiantesByFurgonComponent', () => {
  let component: ListarEstudiantesByFurgonComponent;
  let fixture: ComponentFixture<ListarEstudiantesByFurgonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEstudiantesByFurgonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstudiantesByFurgonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
