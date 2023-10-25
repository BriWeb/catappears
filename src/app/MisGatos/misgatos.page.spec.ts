import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisGatosPage } from './misgatos.page';

describe('MisGatosPage', () => {
  let component: MisGatosPage;
  let fixture: ComponentFixture<MisGatosPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(MisGatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
