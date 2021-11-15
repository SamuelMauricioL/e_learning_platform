import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticarTemasComponent } from './practicar-temas.component';

describe('PracticarTemasComponent', () => {
  let component: PracticarTemasComponent;
  let fixture: ComponentFixture<PracticarTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticarTemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticarTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
