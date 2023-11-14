import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarContraseniaComponent } from './modificar-contrasenia.component';

describe('ModificarContraseniaComponent', () => {
  let component: ModificarContraseniaComponent;
  let fixture: ComponentFixture<ModificarContraseniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarContraseniaComponent]
    });
    fixture = TestBed.createComponent(ModificarContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
