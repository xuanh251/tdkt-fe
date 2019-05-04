import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XetKtCaNhanComponent } from './xet-kt-ca-nhan.component';

describe('XetKtCaNhanComponent', () => {
  let component: XetKtCaNhanComponent;
  let fixture: ComponentFixture<XetKtCaNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetKtCaNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetKtCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
