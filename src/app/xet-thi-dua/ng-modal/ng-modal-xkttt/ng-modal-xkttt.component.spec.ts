import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModalXktttComponent } from './ng-modal-xkttt.component';

describe('NgModalXktttComponent', () => {
  let component: NgModalXktttComponent;
  let fixture: ComponentFixture<NgModalXktttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgModalXktttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModalXktttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
