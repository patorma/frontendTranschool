import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTransportistasComponent } from './listar-transportistas.component';

describe('ListarTransportistasComponent', () => {
  let component: ListarTransportistasComponent;
  let fixture: ComponentFixture<ListarTransportistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTransportistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTransportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
