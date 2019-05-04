import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhThucKhenThuongListComponent } from './hinh-thuc-khen-thuong-list.component';

describe('HinhThucKhenThuongListComponent', () => {
  let component: HinhThucKhenThuongListComponent;
  let fixture: ComponentFixture<HinhThucKhenThuongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhThucKhenThuongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhThucKhenThuongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
