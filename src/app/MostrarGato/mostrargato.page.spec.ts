import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarGatoPage } from './mostrargato.page';

describe('MostrarGatoPage', () => {
  let component: MostrarGatoPage;
  let fixture: ComponentFixture<MostrarGatoPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(MostrarGatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
