import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InQDHoiDongComponent } from './in-qd-hoi-dong.component';

describe('InQDHoiDongComponent', () => {
  let component: InQDHoiDongComponent;
  let fixture: ComponentFixture<InQDHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InQDHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InQDHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
