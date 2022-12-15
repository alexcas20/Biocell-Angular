import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuscarMedicoComponent } from './dialog-buscar-medico.component';

describe('DialogBuscarMedicoComponent', () => {
  let component: DialogBuscarMedicoComponent;
  let fixture: ComponentFixture<DialogBuscarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBuscarMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBuscarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
