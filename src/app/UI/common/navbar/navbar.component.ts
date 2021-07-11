import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';

@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  public user$: Observable<any> = this.auth.afAuth.user;
  constructor(private auth: AuthService, private router: Router) { }

  isStudent: boolean = false;

  async onLogout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  changeProfile() {
    this.isStudent = !this.isStudent;
    console.log(this.isStudent);
  }

}
