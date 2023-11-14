import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitarPerilComponent } from './visitar-peril.component';

describe('VisitarPerilComponent', () => {
  let component: VisitarPerilComponent;
  let fixture: ComponentFixture<VisitarPerilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitarPerilComponent]
    });
    fixture = TestBed.createComponent(VisitarPerilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
