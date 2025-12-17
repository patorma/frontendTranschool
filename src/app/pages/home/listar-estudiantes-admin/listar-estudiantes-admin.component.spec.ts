import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstudiantesAdminComponent } from './listar-estudiantes-admin.component';

describe('ListarEstudiantesAdminComponent', () => {
  let component: ListarEstudiantesAdminComponent;
  let fixture: ComponentFixture<ListarEstudiantesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEstudiantesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstudiantesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
