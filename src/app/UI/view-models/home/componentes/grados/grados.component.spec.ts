import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosComponent } from './grados.component';

describe('GradosComponent', () => {
  let component: GradosComponent;
  let fixture: ComponentFixture<GradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
