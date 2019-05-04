import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanCuComponent } from './can-cu.component';

describe('CanCuComponent', () => {
  let component: CanCuComponent;
  let fixture: ComponentFixture<CanCuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanCuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
