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
  color: string = '';

  ngOnInit(): void {
    var intro = document.getElementById('backg');
    if (this.type_user === 'Docente') {
      intro!.style.backgroundColor = 'rgba(37, 162, 220, 1)';
    } else if (this.type_user === 'Estudiante') {
      intro!.style.backgroundColor = 'rgba(243, 225, 60, 1)';
    }

  }

  async onLogin(typeUser: string) {
    const { email, password } = this.loginForm.value;
    try {
      const user = this.auth.login(email, password);
      if (await user) {
        this.auth.getRol(this.type_user);
        // this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log("onlogin")
      console.log(error);
    }
  }



}
