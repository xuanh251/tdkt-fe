import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChucvuEditComponent } from './chucvu-edit.component';

describe('ChucvuEditComponent', () => {
  let component: ChucvuEditComponent;
  let fixture: ComponentFixture<ChucvuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChucvuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChucvuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
