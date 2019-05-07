import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhThucKhenThuongTapTheListComponent } from './hinh-thuc-khen-thuong-tap-the-list.component';

describe('HinhThucKhenThuongTapTheListComponent', () => {
  let component: HinhThucKhenThuongTapTheListComponent;
  let fixture: ComponentFixture<HinhThucKhenThuongTapTheListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhThucKhenThuongTapTheListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhThucKhenThuongTapTheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
