import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticarComponent } from './practicar.component';

describe('PracticarComponent', () => {
  let component: PracticarComponent;
  let fixture: ComponentFixture<PracticarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
