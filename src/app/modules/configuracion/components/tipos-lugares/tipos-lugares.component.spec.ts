import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposLugaresComponent } from './tipos-lugares.component';

describe('TiposLugaresComponent', () => {
  let component: TiposLugaresComponent;
  let fixture: ComponentFixture<TiposLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposLugaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
