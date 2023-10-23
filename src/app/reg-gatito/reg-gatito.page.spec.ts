import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegGatitoPage } from './reg-gatito.page';

describe('RegGatitoPage', () => {
  let component: RegGatitoPage;
  let fixture: ComponentFixture<RegGatitoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegGatitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
