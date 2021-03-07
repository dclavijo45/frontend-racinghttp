import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaTusProductosComponent } from './ver-lista-tus-productos.component';

describe('VerListaTusProductosComponent', () => {
  let component: VerListaTusProductosComponent;
  let fixture: ComponentFixture<VerListaTusProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListaTusProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerListaTusProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
