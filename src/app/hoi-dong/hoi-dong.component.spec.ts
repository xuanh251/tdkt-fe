import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiDongComponent } from './hoi-dong.component';

describe('HoiDongComponent', () => {
  let component: HoiDongComponent;
  let fixture: ComponentFixture<HoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
