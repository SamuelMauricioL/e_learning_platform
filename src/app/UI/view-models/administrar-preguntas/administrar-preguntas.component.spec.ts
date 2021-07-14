import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPreguntasComponent } from './administrar-preguntas.component';

describe('AdministrarPreguntasComponent', () => {
  let component: AdministrarPreguntasComponent;
  let fixture: ComponentFixture<AdministrarPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
