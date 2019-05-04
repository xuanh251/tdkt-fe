import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XetThiDuaComponent } from './xet-thi-dua.component';

describe('XetThiDuaComponent', () => {
  let component: XetThiDuaComponent;
  let fixture: ComponentFixture<XetThiDuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetThiDuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetThiDuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
