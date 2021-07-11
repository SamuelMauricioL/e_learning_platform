import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private auth: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  type_user: string = this.route.snapshot.params.typeUser;

  ngOnInit(): void {
    
  }

  async onLogin(typeUser: string) {
    const {email, password} = this.loginForm.value;
    try {
      const user = this.auth.login(email, password);
      if (await user) {
        // Redirect to Home Page
        this.router.navigate(['/home']);
      }
    } catch (error) {
      
    }
  }

}
