import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XetTdTapTheComponent } from './xet-td-tap-the.component';

describe('XetTdTapTheComponent', () => {
  let component: XetTdTapTheComponent;
  let fixture: ComponentFixture<XetTdTapTheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetTdTapTheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetTdTapTheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
