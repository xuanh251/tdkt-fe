import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhPhanComponent } from './thanh-phan.component';

describe('ThanhPhanComponent', () => {
  let component: ThanhPhanComponent;
  let fixture: ComponentFixture<ThanhPhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhPhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
