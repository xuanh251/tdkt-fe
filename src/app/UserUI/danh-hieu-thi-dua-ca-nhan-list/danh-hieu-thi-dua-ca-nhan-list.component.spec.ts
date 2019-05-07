import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhHieuThiDuaCaNhanListComponent } from './danh-hieu-thi-dua-ca-nhan-list.component';

describe('DanhHieuThiDuaCaNhanListComponent', () => {
  let component: DanhHieuThiDuaCaNhanListComponent;
  let fixture: ComponentFixture<DanhHieuThiDuaCaNhanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhHieuThiDuaCaNhanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhHieuThiDuaCaNhanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
