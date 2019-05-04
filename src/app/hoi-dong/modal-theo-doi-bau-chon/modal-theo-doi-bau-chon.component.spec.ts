import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTheoDoiBauChonComponent } from './modal-theo-doi-bau-chon.component';

describe('ModalTheoDoiBauChonComponent', () => {
  let component: ModalTheoDoiBauChonComponent;
  let fixture: ComponentFixture<ModalTheoDoiBauChonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTheoDoiBauChonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTheoDoiBauChonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
