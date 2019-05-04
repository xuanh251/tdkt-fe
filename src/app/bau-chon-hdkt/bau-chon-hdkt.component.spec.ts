import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BauChonHdktComponent } from './bau-chon-hdkt.component';

describe('BauChonHdktComponent', () => {
  let component: BauChonHdktComponent;
  let fixture: ComponentFixture<BauChonHdktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BauChonHdktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BauChonHdktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
