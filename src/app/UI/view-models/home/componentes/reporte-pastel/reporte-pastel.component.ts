import { AfterViewInit, Component, ElementRef, ViewChild , OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-reporte-pastel',
  templateUrl: './reporte-pastel.component.html',
  styleUrls: ['./reporte-pastel.component.scss']
})
export class ReportePastelComponent implements AfterViewInit {
  @Input() datosGrafico:any = [];
  @ViewChild('pieCanvas')
  private pieCanvas!: ElementRef;

  pieChart: any = null;

  constructor() { }

  ngAfterViewInit(): void {
    // this.pieChartBrowser();
  }

  pieChartBrowser(){
    if(this.pieChart!=null){
      this.pieChart.destroy();
    }
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: this.datosGrafico,    
      options:{
        maintainAspectRatio:false
      } 
    });

    this.pieChart.update('active');
  }
  

}
