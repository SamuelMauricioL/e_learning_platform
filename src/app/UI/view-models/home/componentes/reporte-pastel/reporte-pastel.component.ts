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

  pieChart: any;

  constructor() { }

  ngAfterViewInit(): void {
    // this.pieChartBrowser();
  }

  pieChartBrowser(){
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: this.datosGrafico,    
      options:{
        maintainAspectRatio:false
      } 
    });
  }

}
