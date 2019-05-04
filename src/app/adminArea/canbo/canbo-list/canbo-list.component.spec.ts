import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanboListComponent } from './canbo-list.component';

describe('CanboListComponent', () => {
  let component: CanboListComponent;
  let fixture: ComponentFixture<CanboListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanboListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
