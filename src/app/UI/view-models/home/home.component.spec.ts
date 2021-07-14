import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infraestructure/driven-adapter/auth/auth.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let auth: AuthService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
    component = new HomeComponent(auth, route);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('debera crearse', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('La variable User no debe ser vacia', () => {
  //   expect(component.test).toEqual('asd')
  // })

});
