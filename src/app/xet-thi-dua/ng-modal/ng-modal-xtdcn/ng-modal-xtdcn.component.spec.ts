import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModalXtdcnComponent } from './ng-modal-xtdcn.component';

describe('NgModalXtdcnComponent', () => {
  let component: NgModalXtdcnComponent;
  let fixture: ComponentFixture<NgModalXtdcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgModalXtdcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModalXtdcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
