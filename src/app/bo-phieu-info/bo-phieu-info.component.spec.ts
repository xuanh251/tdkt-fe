import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoPhieuInfoComponent } from './bo-phieu-info.component';

describe('BoPhieuInfoComponent', () => {
  let component: BoPhieuInfoComponent;
  let fixture: ComponentFixture<BoPhieuInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoPhieuInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoPhieuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
