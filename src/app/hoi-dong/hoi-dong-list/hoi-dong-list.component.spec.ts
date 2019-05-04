import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiDongListComponent } from './hoi-dong-list.component';

describe('HoiDongListComponent', () => {
  let component: HoiDongListComponent;
  let fixture: ComponentFixture<HoiDongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiDongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiDongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
