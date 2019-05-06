import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiemdanhComponent } from './modal-diemdanh.component';

describe('ModalDiemdanhComponent', () => {
  let component: ModalDiemdanhComponent;
  let fixture: ComponentFixture<ModalDiemdanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDiemdanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDiemdanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
