import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKetQuaBauChonTdComponent } from './modal-ket-qua-bau-chon-td.component';

describe('ModalKetQuaBauChonTdComponent', () => {
  let component: ModalKetQuaBauChonTdComponent;
  let fixture: ComponentFixture<ModalKetQuaBauChonTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKetQuaBauChonTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKetQuaBauChonTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
