import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisGatitosPage } from './mis-gatitos.page';

describe('MisGatitosPage', () => {
  let component: MisGatitosPage;
  let fixture: ComponentFixture<MisGatitosPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(MisGatitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
