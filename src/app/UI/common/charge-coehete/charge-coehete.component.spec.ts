import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCoeheteComponent } from './charge-coehete.component';

describe('ChargeCoeheteComponent', () => {
  let component: ChargeCoeheteComponent;
  let fixture: ComponentFixture<ChargeCoeheteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeCoeheteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeCoeheteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
