import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiUsuarioMComponent } from './mi-usuario-m.component';

describe('MiUsuarioMComponent', () => {
  let component: MiUsuarioMComponent;
  let fixture: ComponentFixture<MiUsuarioMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiUsuarioMComponent]
    });
    fixture = TestBed.createComponent(MiUsuarioMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
