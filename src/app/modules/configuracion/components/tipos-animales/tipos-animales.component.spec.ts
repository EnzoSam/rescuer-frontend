import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposAnimalesComponent } from './tipos-animales.component';

describe('TiposAnimalesComponent', () => {
  let component: TiposAnimalesComponent;
  let fixture: ComponentFixture<TiposAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposAnimalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
