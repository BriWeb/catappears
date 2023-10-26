import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarGatoPage } from './agregargato.page';

describe('AgregarGatoPage', () => {
  let component: AgregarGatoPage;
  let fixture: ComponentFixture<AgregarGatoPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AgregarGatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
