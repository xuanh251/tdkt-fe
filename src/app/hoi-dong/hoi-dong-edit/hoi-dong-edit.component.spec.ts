import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiDongEditComponent } from './hoi-dong-edit.component';

describe('HoiDongEditComponent', () => {
  let component: HoiDongEditComponent;
  let fixture: ComponentFixture<HoiDongEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiDongEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiDongEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
