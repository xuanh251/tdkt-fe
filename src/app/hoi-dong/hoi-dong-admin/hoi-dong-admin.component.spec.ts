import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiDongAdminComponent } from './hoi-dong-admin.component';

describe('HoiDongAdminComponent', () => {
  let component: HoiDongAdminComponent;
  let fixture: ComponentFixture<HoiDongAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiDongAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiDongAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
