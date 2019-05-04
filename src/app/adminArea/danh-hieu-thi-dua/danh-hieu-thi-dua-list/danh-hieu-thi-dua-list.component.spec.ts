import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhHieuThiDuaListComponent } from './danh-hieu-thi-dua-list.component';

describe('DanhHieuThiDuaListComponent', () => {
  let component: DanhHieuThiDuaListComponent;
  let fixture: ComponentFixture<DanhHieuThiDuaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhHieuThiDuaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhHieuThiDuaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
