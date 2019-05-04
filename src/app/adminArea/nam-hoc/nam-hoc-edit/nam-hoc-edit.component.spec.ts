import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamHocEditComponent } from './nam-hoc-edit.component';

describe('NamHocEditComponent', () => {
  let component: NamHocEditComponent;
  let fixture: ComponentFixture<NamHocEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamHocEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamHocEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
