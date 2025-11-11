import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecorridosComponent } from './listar-recorridos.component';

describe('ListarRecorridosComponent', () => {
  let component: ListarRecorridosComponent;
  let fixture: ComponentFixture<ListarRecorridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarRecorridosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRecorridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
