import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosadquiridosComponent } from './productosadquiridos.component';

describe('ProductosadquiridosComponent', () => {
  let component: ProductosadquiridosComponent;
  let fixture: ComponentFixture<ProductosadquiridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosadquiridosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosadquiridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
