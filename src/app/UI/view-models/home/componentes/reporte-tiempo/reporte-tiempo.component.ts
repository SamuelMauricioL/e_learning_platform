import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables,} from 'chart.js';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';
import { months } from './Utils';
Chart.register(...registerables);



@Component({
  selector: 'app-reporte-tiempo',
  templateUrl: './reporte-tiempo.component.html',
  styleUrls: ['./reporte-tiempo.component.scss']
})
export class ReporteTiempoComponent implements OnInit {
  @Input() 
  idEstudiante : string ="";

  constructor(
    private serviceResp : GetRespuestasUseCases,
  ) { }

  ngOnInit(): void {
    this.cargaGrafico();
    this.getDatos();
  }
  
  
  cargaGrafico() {
    
    const labels = months({count: 10});
    const data = {
      labels: labels,
      datasets: [
        {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        }
    ]
    };
    const myChart = new Chart("myChart",{
      type:"line",
      data:data,


    })
  }

  getDatos(){
    let estudiante:string = "TbnUR5AMXMS0W2r8rzXp";
    let tema:string = "JlNb9RUUpusyP15R226D";
    this.serviceResp.getLastDocumentIntento(estudiante,tema).subscribe((val:any)=>{
      console.log(val);
    })
  }
  
  
}
