import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-intentos',
  templateUrl: './reporte-intentos.component.html',
  styleUrls: ['./reporte-intentos.component.scss']
})
export class ReporteIntentosComponent implements OnInit {
  @Input() listaIntentos:any;
  constructor(
    
  ) { }

  ngOnInit(): void {    
  }

  

}
