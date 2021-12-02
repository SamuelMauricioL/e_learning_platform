import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables,} from 'chart.js';
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

  constructor() { }

  ngOnInit(): void {
    this.cargaGrafico();
    
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

  }
  
  
}
