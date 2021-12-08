import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './infraestructure/driven-adapter/auth/auth.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  footer_title = 'Powered by ABC Team';

  public user$?: Observable<any> = this.auth.afAuth.user;
  
  constructor(private auth: AuthService) { }

  ngOnInit(): void {}
}
