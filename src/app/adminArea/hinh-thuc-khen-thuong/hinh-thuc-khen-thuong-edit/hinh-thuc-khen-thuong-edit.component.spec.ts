import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhThucKhenThuongEditComponent } from './hinh-thuc-khen-thuong-edit.component';

describe('HinhThucKhenThuongEditComponent', () => {
  let component: HinhThucKhenThuongEditComponent;
  let fixture: ComponentFixture<HinhThucKhenThuongEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhThucKhenThuongEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhThucKhenThuongEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
