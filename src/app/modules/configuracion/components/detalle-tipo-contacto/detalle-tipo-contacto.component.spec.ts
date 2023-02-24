import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTipoContactoComponent } from './detalle-tipo-contacto.component';

describe('DetalleTipoContactoComponent', () => {
  let component: DetalleTipoContactoComponent;
  let fixture: ComponentFixture<DetalleTipoContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTipoContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTipoContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
