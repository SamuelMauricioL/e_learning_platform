import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePastelComponent } from './reporte-pastel.component';

describe('ReportePastelComponent', () => {
  let component: ReportePastelComponent;
  let fixture: ComponentFixture<ReportePastelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePastelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePastelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
