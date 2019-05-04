import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhHieuThiDuaTapTheListComponent } from './danh-hieu-thi-dua-tap-the-list.component';

describe('DanhHieuThiDuaTapTheListComponent', () => {
  let component: DanhHieuThiDuaTapTheListComponent;
  let fixture: ComponentFixture<DanhHieuThiDuaTapTheListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhHieuThiDuaTapTheListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhHieuThiDuaTapTheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
