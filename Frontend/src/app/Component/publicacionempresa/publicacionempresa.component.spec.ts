import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionempresaComponent } from './publicacionempresa.component';

describe('PublicacionempresaComponent', () => {
  let component: PublicacionempresaComponent;
  let fixture: ComponentFixture<PublicacionempresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicacionempresaComponent]
    });
    fixture = TestBed.createComponent(PublicacionempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
