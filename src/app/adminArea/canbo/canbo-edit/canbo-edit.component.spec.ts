import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanboEditComponent } from './canbo-edit.component';

describe('CanboEditComponent', () => {
  let component: CanboEditComponent;
  let fixture: ComponentFixture<CanboEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanboEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanboEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
