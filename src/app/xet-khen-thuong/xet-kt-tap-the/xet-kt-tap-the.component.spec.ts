import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XetKtTapTheComponent } from './xet-kt-tap-the.component';

describe('XetKtTapTheComponent', () => {
  let component: XetKtTapTheComponent;
  let fixture: ComponentFixture<XetKtTapTheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetKtTapTheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetKtTapTheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
