import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChucvuListComponent } from './chucvu-list.component';

describe('ChucvuListComponent', () => {
  let component: ChucvuListComponent;
  let fixture: ComponentFixture<ChucvuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChucvuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChucvuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
