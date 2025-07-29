import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionlugarComponent } from './direccionlugar.component';

describe('DireccionlugarComponent', () => {
  let component: DireccionlugarComponent;
  let fixture: ComponentFixture<DireccionlugarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DireccionlugarComponent]
    });
    fixture = TestBed.createComponent(DireccionlugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
