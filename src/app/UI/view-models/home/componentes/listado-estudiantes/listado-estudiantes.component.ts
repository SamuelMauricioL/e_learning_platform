import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-listado-estudiantes',
  templateUrl: './listado-estudiantes.component.html',
  styleUrls: ['./listado-estudiantes.component.scss']
})
export class ListadoEstudiantesComponent implements OnInit {
  @Input() estudiantes:any;
  @Output() codigoEstudiante = new EventEmitter<any>();
  estudiante :string = '';
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e:any) {    
    this.codigoEstudiante.emit(e.target.value)
  }
  seleccionAutomatica(e:string){
    this.codigoEstudiante.emit(e)
    this.estudiante = e
  }

} 
