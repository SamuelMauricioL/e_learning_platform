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
  datoUsuario!: any;
  nombre: any;
  codigo:any;
  email:any

  rol:string="";
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // localStorage.setItem('usuario', JSON.stringify(this.user));
    this.datoUsuario = localStorage.getItem('userRoles');
    this.nombre = JSON.parse(this.datoUsuario).nombre;
    this.codigo = JSON.parse(this.datoUsuario).codigo;
    this.email = JSON.parse(this.datoUsuario).email;
    let usuario:any = localStorage.getItem('user');
    this.rol = JSON.parse(this.datoUsuario).rol;
  }

  cargarInformacionGrados(){
    
  }

}
