import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptaComponent } from './rpta.component';

describe('RptaComponent', () => {
  let component: RptaComponent;
  let fixture: ComponentFixture<RptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RptaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
