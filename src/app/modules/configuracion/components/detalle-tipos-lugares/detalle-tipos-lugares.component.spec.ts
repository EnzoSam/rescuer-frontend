import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTiposLugaresComponent } from './detalle-tipos-lugares.component';

describe('DetalleTiposLugaresComponent', () => {
  let component: DetalleTiposLugaresComponent;
  let fixture: ComponentFixture<DetalleTiposLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTiposLugaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTiposLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
