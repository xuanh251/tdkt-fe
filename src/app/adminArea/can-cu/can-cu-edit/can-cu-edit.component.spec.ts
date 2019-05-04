import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanCuEditComponent } from './can-cu-edit.component';

describe('CanCuEditComponent', () => {
  let component: CanCuEditComponent;
  let fixture: ComponentFixture<CanCuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanCuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanCuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
