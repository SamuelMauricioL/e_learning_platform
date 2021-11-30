import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIntentosComponent } from './reporte-intentos.component';

describe('ReporteIntentosComponent', () => {
  let component: ReporteIntentosComponent;
  let fixture: ComponentFixture<ReporteIntentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteIntentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteIntentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
