import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDatoUtilComponent } from './detalle-dato-util.component';

describe('DetalleDatoUtilComponent', () => {
  let component: DetalleDatoUtilComponent;
  let fixture: ComponentFixture<DetalleDatoUtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDatoUtilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDatoUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
