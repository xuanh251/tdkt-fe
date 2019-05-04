import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhHieuThiDuaEditComponent } from './danh-hieu-thi-dua-edit.component';

describe('DanhHieuThiDuaEditComponent', () => {
  let component: DanhHieuThiDuaEditComponent;
  let fixture: ComponentFixture<DanhHieuThiDuaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhHieuThiDuaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhHieuThiDuaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
