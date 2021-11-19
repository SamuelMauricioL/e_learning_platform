import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsPreguntasComponent } from './steps-preguntas.component';

describe('StepsPreguntasComponent', () => {
  let component: StepsPreguntasComponent;
  let fixture: ComponentFixture<StepsPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
