import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModalXktcnComponent } from './ng-modal-xktcn.component';

describe('NgModalXktcnComponent', () => {
  let component: NgModalXktcnComponent;
  let fixture: ComponentFixture<NgModalXktcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgModalXktcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModalXktcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
