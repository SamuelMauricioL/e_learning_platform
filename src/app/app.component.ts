import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AlbumApiServiceWithoutDelay } from './infraestructure/driven-adapter/album-api/album-api-withou-delay.service';
import { AlbumApiService } from './infraestructure/driven-adapter/album-api/album-api.service'
import { AuthService } from './infraestructure/driven-adapter/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  footer_title = 'Powered by ABC Team';

  isStudent: boolean = false;
  public user$: Observable<any> = this.auth.afAuth.user;
  constructor(private auth: AuthService){
    
  }
  changeProfile() {
    this.isStudent = !this.isStudent;
  }

  //  constructor (private _albumApiService : AlbumApiServiceWithoutDelay){}
  ngOnInit(): void {
  }
}
