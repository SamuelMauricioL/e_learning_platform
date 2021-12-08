import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.scss']
})
export class GradosComponent implements OnInit {
  @Input() grado:any;
  constructor() { 

   }


  ngOnInit(): void {
  }

  selecionarGrado(grado:string){
    console.log(grado);    
  }

}
