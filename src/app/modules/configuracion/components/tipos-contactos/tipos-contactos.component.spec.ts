import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposContactosComponent } from './tipos-contactos.component';

describe('TiposContactosComponent', () => {
  let component: TiposContactosComponent;
  let fixture: ComponentFixture<TiposContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposContactosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
