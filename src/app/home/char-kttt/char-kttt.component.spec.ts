import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharKtttComponent } from './char-kttt.component';

describe('CharKtttComponent', () => {
  let component: CharKtttComponent;
  let fixture: ComponentFixture<CharKtttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharKtttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharKtttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
