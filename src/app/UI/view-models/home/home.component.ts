import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserUseCases } from 'src/app/domain/usecase/get-user-use-case';
import { GetRespuestasUseCases } from 'src/app/domain/usecase/get-respuestas-use-case';

import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';
import { ReporteTiempoComponent } from './componentes/reporte-tiempo/reporte-tiempo.component';
import { ReportePastelComponent } from './componentes/reporte-pastel/reporte-pastel.component';
import { DatePipe } from '@angular/common';
import { GetGradosUseCases } from 'src/app/domain/usecase/get-grados-use-case';
import { ListadoEstudiantesComponent } from './componentes/listado-estudiantes/listado-estudiantes.component';
import { GetTemasUseCases } from 'src/app/domain/usecase/get-temas-use-case';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @Output add = new EventEmitter

  // @Output add = new EventEmitter
  @ViewChild(ReporteTiempoComponent)
  reporteTiempo: ReporteTiempoComponent = new ReporteTiempoComponent;
  @ViewChild(ReportePastelComponent)
  reportePaste: ReportePastelComponent = new ReportePastelComponent;
  @ViewChild(ListadoEstudiantesComponent)
  listadoEstudiantes: ListadoEstudiantesComponent = new ListadoEstudiantesComponent;
  
  grados : any = [] 
  public estudiantes : any = []
  listaIntentos : any = []
  usuarioRol : string
  usuarioSeleccionado : string = ''

  datosGrafico:any = {
    labels: [],
    datasets: [
      {
      label: 'Intentos',
      data: [],
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
      }
    ],
  };

  datosGraficoPie : any = {
    labels: ['Muy bajo', 'Bajo', 'Intermedio', 'Bueno', 'Muy Bueno'],
    datasets: [{
      backgroundColor: [
        '#2ecc71',
        '#3498db',
        '#95a5a6',
        '#9b59b6',
        '#f1c40f',
        '#e74c3c'
      ],
      data: []
    }]
  }
  public user$: Observable<any> = this.auth.afAuth.user;

  rol:string="";
  constructor(
    private service : GetUserUseCases,
    private serviceResp : GetRespuestasUseCases,
    private serviceGrado : GetGradosUseCases,
    private serviceTema : GetTemasUseCases,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { 
    this.usuarioRol = JSON.parse(String(localStorage.getItem('user'))).rol    
    this.grados = JSON.parse(String(localStorage.getItem('userRoles'))).grados    
    this.seleccionarGrado(this.grados[0].id)
  }

  ngOnInit(): void {
    this.cargarInformacionGrados() 
  }

  cargarInformacionGrados(){
    if (this.usuarioRol == 'Administrador') {
      this.serviceGrado.getAllCursos().subscribe(resp => {
        this.grados = resp;
      },
      error => {
        console.error(error);
      });      
    }
  }
  seleccionarGrado(id:string){    
    // alert("selecciona el grado "+ ruta)
    var ruta = 'Grados/'+id
    console.log(ruta);
    this.service.getUsersGrado(ruta).subscribe(data=>{
      this.estudiantes = data      
      if (this.estudiantes.length == 1) {
        this.listadoEstudiantes.seleccionAutomatica(this.estudiantes[0].id)
      }else{
        this.usuarioSeleccionado = ''
      }
    })    
  }
  cargaInformacion(e:any){    
    this.serviceResp.getIntentosByUser(e).subscribe((val:any)=>{      
      this.listaIntentos = val      
      this.listaIntentos.forEach((item : any) => {
        const idTemaArray = item.idTema.split("/");
        this.serviceTema.getTema(idTemaArray[1]).subscribe((val:any)=>{          
          item.tema = val.tema
        })        
      });
      const datePipe = new DatePipe("en-US");
      // obtiene array de las fechas unicas
      const unique = [...new Set(val.map((item: { fecha: any; }) => datePipe.transform(item.fecha,'dd/MM/yyyy')))]; 
      // 
      // cuenta los itentos segun la fecha y se agrega en un array
      var intentosArray : any = []
      var rangosArray : any = []
      var intentos = 0
      var rango1 = 0
      var rango2 = 0
      var rango3 = 0
      var rango4 = 0
      var rango5 = 0

      val.forEach((item_sub :any) => {        
        switch (parseInt(item_sub.promedio)) {
          case 0:
          case 5:
            rango1 ++
            break;
          case 6:
          case 10:
            rango2 ++
            break; 
          case 11:
          case 15:
            rango3 ++
            break; 
          case 16:            
          case 19:
            rango4 ++
            break; 
          case 20:
            rango5 ++
            break;  
        }          
      });      
      rangosArray.push(rango1,rango2,rango3,rango4,rango5)
      

      unique.forEach(item => {        
        val.forEach((item_sub :any) => {
          var fecha : any = datePipe.transform(item_sub.fecha,'dd/MM/yyyy')
          if (item == fecha) {
            intentos ++
          }               
        });
        intentosArray.push(intentos)        
      });
      // 

      // carga los datos de la linea de tiempo
      this.datosGrafico.labels=unique;
      this.datosGrafico.datasets[0].data=intentosArray;
      this.reporteTiempo.cargaGrafico()
      //       
      
      // craga los datos del pie
      this.datosGraficoPie.datasets[0].data = rangosArray      
      this.reportePaste.pieChartBrowser()
      // 
      
    })
   
    this.usuarioSeleccionado = e       
    
  }
  validarRol(){
    return this.usuarioRol != 'Estudiante' ? true : false;
  }
  validarUsuarioSeleccionado(){
    return this.usuarioSeleccionado != '' ? true : false;
  }

}
