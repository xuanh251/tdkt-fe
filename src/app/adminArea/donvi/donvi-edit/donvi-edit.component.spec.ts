import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonviEditComponent } from './donvi-edit.component';

describe('DonviEditComponent', () => {
  let component: DonviEditComponent;
  let fixture: ComponentFixture<DonviEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonviEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonviEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
