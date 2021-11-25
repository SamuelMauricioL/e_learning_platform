import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-administrar-preguntas',
  templateUrl: './administrar-preguntas.component.html',
  styleUrls: ['./administrar-preguntas.component.scss']
})
export class AdministrarPreguntasComponent implements OnInit {
  constructor(
    private service: GetPreguntasUseCases,
    private route: ActivatedRoute,
    private eventManager:EventManager,
  ) {
    
  }
  ngOnInit(): void {
    let every:any = document.querySelectorAll('.bloque');
    let everytitle:any = document.querySelectorAll('.titulo');
    everytitle.forEach((one:any,i:number) => {
      this.eventManager.addEventListener(one,'click',()=>{
        let find = every[i].classList.contains('activo');
        if(find){
          every[i].classList.remove('activo');
        }else{
          every[i].classList.add('activo');
        }
        
      })
    });
  }
  
  openModal(nameModal:string){
    let modal:any = document.querySelector(nameModal);
    let contenedor:any = modal.querySelector('.contenedor');
    contenedor.classList.add('activo');
    modal.classList.add('activo');
  }
  closeModal(nameModal:string){
    let modal:any = document.querySelector(nameModal);
    let contenedor:any = modal.querySelector('.contenedor');
    contenedor.classList.remove('activo');
    modal.classList.remove('activo');
    
  }

}
