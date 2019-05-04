import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChucDanhEditComponent } from './chuc-danh-edit.component';

describe('ChucDanhEditComponent', () => {
  let component: ChucDanhEditComponent;
  let fixture: ComponentFixture<ChucDanhEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChucDanhEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChucDanhEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
