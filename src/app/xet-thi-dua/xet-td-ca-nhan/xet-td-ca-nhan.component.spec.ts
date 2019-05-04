import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XetTdCaNhanComponent } from './xet-td-ca-nhan.component';

describe('XetTdCaNhanComponent', () => {
  let component: XetTdCaNhanComponent;
  let fixture: ComponentFixture<XetTdCaNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetTdCaNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetTdCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
