import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BauChonDhtdComponent } from './bau-chon-dhtd.component';

describe('BauChonDhtdComponent', () => {
  let component: BauChonDhtdComponent;
  let fixture: ComponentFixture<BauChonDhtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BauChonDhtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BauChonDhtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
