import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharTdttComponent } from './char-tdtt.component';

describe('CharTdttComponent', () => {
  let component: CharTdttComponent;
  let fixture: ComponentFixture<CharTdttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharTdttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharTdttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
