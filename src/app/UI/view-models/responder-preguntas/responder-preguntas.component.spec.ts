import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderPreguntasComponent } from './responder-preguntas.component';

describe('ResponderPreguntasComponent', () => {
  let component: ResponderPreguntasComponent;
  let fixture: ComponentFixture<ResponderPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
