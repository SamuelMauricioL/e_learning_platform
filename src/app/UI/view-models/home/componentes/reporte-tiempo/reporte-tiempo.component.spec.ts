import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTiempoComponent } from './reporte-tiempo.component';

describe('ReporteTiempoComponent', () => {
  let component: ReporteTiempoComponent;
  let fixture: ComponentFixture<ReporteTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
