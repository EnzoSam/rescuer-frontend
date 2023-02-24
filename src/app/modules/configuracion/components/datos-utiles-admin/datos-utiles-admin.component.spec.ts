import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosUtilesAdminComponent } from './datos-utiles-admin.component';

describe('DatosUtilesAdminComponent', () => {
  let component: DatosUtilesAdminComponent;
  let fixture: ComponentFixture<DatosUtilesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosUtilesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosUtilesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
