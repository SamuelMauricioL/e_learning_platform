import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public user$: Observable<any> = this.auth.afAuth.user;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

}
