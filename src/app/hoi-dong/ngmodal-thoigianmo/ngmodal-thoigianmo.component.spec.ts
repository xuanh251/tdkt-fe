import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgmodalThoigianmoComponent } from './ngmodal-thoigianmo.component';

describe('NgmodalThoigianmoComponent', () => {
  let component: NgmodalThoigianmoComponent;
  let fixture: ComponentFixture<NgmodalThoigianmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgmodalThoigianmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgmodalThoigianmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
