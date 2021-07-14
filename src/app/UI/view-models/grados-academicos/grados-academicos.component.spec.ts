import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosAcademicosComponent } from './grados-academicos.component';

describe('GradosAcademicosComponent', () => {
  let component: GradosAcademicosComponent;
  let fixture: ComponentFixture<GradosAcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradosAcademicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradosAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
