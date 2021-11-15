import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticarResolverComponent } from './practicar-resolver.component';

describe('PracticarResolverComponent', () => {
  let component: PracticarResolverComponent;
  let fixture: ComponentFixture<PracticarResolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticarResolverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticarResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
