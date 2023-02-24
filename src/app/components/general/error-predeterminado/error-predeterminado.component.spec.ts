import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPredeterminadoComponent } from './error-predeterminado.component';

describe('ErrorPredeterminadoComponent', () => {
  let component: ErrorPredeterminadoComponent;
  let fixture: ComponentFixture<ErrorPredeterminadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPredeterminadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPredeterminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
