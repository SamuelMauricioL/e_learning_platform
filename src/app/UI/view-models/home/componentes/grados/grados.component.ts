import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.scss']
})
export class GradosComponent implements OnInit {

  constructor() { 
    this.infoGrado = JSON.parse(String(localStorage.getItem('userRoles'))).grado, 
    this.infoPerson = JSON.parse(String(localStorage.getItem('userRoles'))).nombre,
    this.infoEmail = JSON.parse(String(localStorage.getItem('userRoles'))).email,
    this.infoCode = JSON.parse(String(localStorage.getItem('userRoles'))).codigo
   }

  infoGrado: any;
  infoPerson: any;
  infoEmail: any;
  infoCode: any;

  ngOnInit(): void {
    
  }

}
