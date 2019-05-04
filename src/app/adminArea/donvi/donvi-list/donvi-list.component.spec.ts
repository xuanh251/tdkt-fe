import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonviListComponent } from './donvi-list.component';

describe('DonviListComponent', () => {
  let component: DonviListComponent;
  let fixture: ComponentFixture<DonviListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonviListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonviListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
