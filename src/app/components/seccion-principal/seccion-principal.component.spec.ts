import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionPrincipalComponent } from './seccion-principal.component';

describe('SeccionPrincipalComponent', () => {
  let component: SeccionPrincipalComponent;
  let fixture: ComponentFixture<SeccionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
