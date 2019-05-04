import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalThanhvienComponent } from './modal-thanhvien.component';

describe('ModalThanhvienComponent', () => {
  let component: ModalThanhvienComponent;
  let fixture: ComponentFixture<ModalThanhvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalThanhvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalThanhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
