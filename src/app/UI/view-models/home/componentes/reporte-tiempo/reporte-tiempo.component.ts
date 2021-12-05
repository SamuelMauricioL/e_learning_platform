import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables,} from 'chart.js';
// import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';
import { months } from './Utils';
Chart.register(...registerables);



@Component({
  selector: 'app-reporte-tiempo',
  templateUrl: './reporte-tiempo.component.html',
  styleUrls: ['./reporte-tiempo.component.scss']
})
export class ReporteTiempoComponent implements OnInit {  
  @Input() datosGrafico:any;
  idEstudiante : string ="";

  Intentos : any=[];
  myChart:any =null;
  constructor(
    // private serviceResp : GetRespuestasUseCases,
  ) { }

  ngOnInit(){    
    // this.cargaGrafico();
    // this.getDatos();
  }

    
  cargaGrafico() {        
    if(this.myChart!=null){
      this.myChart.destroy();
    }
    this.myChart = new Chart("myChart",{
      type:"line",
      data:this.datosGrafico,


    })
    this.myChart.update('active');
    
  }


  // getDatos(){
  //   let estudiante:string = "TbnUR5AMXMS0W2r8rzXp";
  //   let tema:string = "JlNb9RUUpusyP15R226D";
    
  //   this.serviceResp.getIntentosByUser(estudiante).subscribe((val:any)=>{
  //     let fecha = new Date(parseInt(val[0].fechaId))
  //     console.log(fecha);
  //     this.datosGrafico.labels=['1','2','3','4','5','6','7'];
  //     this.datosGrafico.datasets[0].data=[65, 59, 80, 81, 56, 55, 40];
  //     this.cargaGrafico();
  //     // this.myChart.reset();
  //     // console.log(this.myChart.data);
      
      
  //   })
  // }

  reordenarIntentos(intentos:any){


  }

  
  
  
}