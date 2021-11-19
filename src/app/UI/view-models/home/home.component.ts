import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user$: Observable<any> = this.auth.afAuth.user;
  public test: string = "asd";

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.user$);
  }
  

}
