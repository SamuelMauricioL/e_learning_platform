import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    private auth: AuthService,  
    public router: Router, 
    private route: ActivatedRoute,) 
  { }
    
  public user$: Observable<any> = this.auth.afAuth.user;
  public ans = this.auth.getCurrentUser();


  ngOnInit(): void {
    console.log(this.ans);
    console.log(this.user$)
  }

}
