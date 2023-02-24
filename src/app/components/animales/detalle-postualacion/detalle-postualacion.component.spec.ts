import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePostualacionComponent } from './detalle-postualacion.component';

describe('DetallePostualacionComponent', () => {
  let component: DetallePostualacionComponent;
  let fixture: ComponentFixture<DetallePostualacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePostualacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePostualacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
