import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModalXtdttComponent } from './ng-modal-xtdtt.component';

describe('NgModalXtdttComponent', () => {
  let component: NgModalXtdttComponent;
  let fixture: ComponentFixture<NgModalXtdttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgModalXtdttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModalXtdttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
