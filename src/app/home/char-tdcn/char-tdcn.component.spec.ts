import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharTdcnComponent } from './char-tdcn.component';

describe('CharTdcnComponent', () => {
  let component: CharTdcnComponent;
  let fixture: ComponentFixture<CharTdcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharTdcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharTdcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
