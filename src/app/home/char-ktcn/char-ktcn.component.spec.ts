import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharKtcnComponent } from './char-ktcn.component';

describe('CharKtcnComponent', () => {
  let component: CharKtcnComponent;
  let fixture: ComponentFixture<CharKtcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharKtcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharKtcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
