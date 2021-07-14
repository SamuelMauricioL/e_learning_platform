import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarSubTemasComponent } from './administrar-sub-temas.component';

describe('AdministrarSubTemasComponent', () => {
  let component: AdministrarSubTemasComponent;
  let fixture: ComponentFixture<AdministrarSubTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarSubTemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarSubTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
