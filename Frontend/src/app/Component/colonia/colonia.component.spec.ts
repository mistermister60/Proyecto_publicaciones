import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoniaComponent } from './colonia.component';

describe('ColoniaComponent', () => {
  let component: ColoniaComponent;
  let fixture: ComponentFixture<ColoniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColoniaComponent]
    });
    fixture = TestBed.createComponent(ColoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
