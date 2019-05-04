import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XetKhenThuongComponent } from './xet-khen-thuong.component';

describe('XetKhenThuongComponent', () => {
  let component: XetKhenThuongComponent;
  let fixture: ComponentFixture<XetKhenThuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetKhenThuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetKhenThuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
