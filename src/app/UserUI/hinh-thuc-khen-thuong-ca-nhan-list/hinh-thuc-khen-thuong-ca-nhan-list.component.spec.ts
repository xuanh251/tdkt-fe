import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhThucKhenThuongCaNhanListComponent } from './hinh-thuc-khen-thuong-ca-nhan-list.component';

describe('HinhThucKhenThuongCaNhanListComponent', () => {
  let component: HinhThucKhenThuongCaNhanListComponent;
  let fixture: ComponentFixture<HinhThucKhenThuongCaNhanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhThucKhenThuongCaNhanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhThucKhenThuongCaNhanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
