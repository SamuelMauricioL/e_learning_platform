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

import { first } from 'rxjs/operators';

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

  grados: any = []
  public estudiantes: any = []
  listaIntentos: any = []
  listaIntentosTabla:any = []
  usuarioRol: string = "Estudiante";
  usuarioSeleccionado: string = ''

  datosGrafico: any = {
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

  datosGraficoPie: any = {
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

  rol: string = "";
  constructor(
    private service: GetUserUseCases,
    private serviceResp: GetRespuestasUseCases,
    private serviceGrado: GetGradosUseCases,
    private serviceTema: GetTemasUseCases,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {
    // this.user$.subscribe((val: any) => {
    //   console.log(val);
    //   this.cargarUsuario(val.email);
    // })
    // this.cargarInformacionGrados()
  }

  ngOnInit(): void {

    this.user$.subscribe((val: any) => {
      if (val) {
        this.cargarUsuario(val.email);
      }

    })
    

  }

  cargarUsuario(email: string) {

    this.service.getUsersByEmail(email).subscribe((val: any) => {
      
      this.usuarioRol = val[0].rol
      this.grados = val[0].grados
      if(val[0].rol == "Administrador"){
        this.cargarInformacionGrados()
      }else{
        this.seleccionarGrado(this.grados[0].id)
      }
      
      
    })
  }
  cargarInformacionGrados() {
    
    if (this.usuarioRol == 'Administrador') {
      
      this.serviceGrado.getAllCursos().subscribe(resp => {
        this.grados = resp;
        this.seleccionarGrado(this.grados[0].id)
      },
        error => {
          console.error(error);
        });
    }
  }
  seleccionarGrado(id: string) {
    this.service.getAllUsers().subscribe((val:any)=>{
      let estudiantes = val.filter((fil:any)=>fil.rol== "Estudiante" && fil.grados[0].id == id)
      this.estudiantes = estudiantes
      console.log("estudiantes",this.estudiantes);
      if (this.estudiantes.length > 0) {
        console.log("entrando a varios")
        this.listadoEstudiantes.seleccionAutomatica(this.estudiantes[0].id)
      } else {
        console.log("entrando a nulos")
        this.usuarioSeleccionado = ''
      }
      
    })
  }
  cargaInformacion(e: any) {
    this.listaIntentos = []
    this.listaIntentosTabla = []
    this.serviceResp.getIntentosByUser(e).subscribe((val: any) => {
      this.listaIntentos = val;
      
      this.listaIntentos.forEach((item: any, id:number) => {
        const idTemaArray = item.idTema.split("/");
        this.serviceTema.getTema(idTemaArray[0]).subscribe((val: any) => {
          item.tema = val.tema
          if(id == (this.listaIntentos.length -1) ){
            console.log("posicion",id + " "+ (this.listaIntentos.length - 1) )
            let arrayVacio:any = [];
            this.listaIntentos.forEach((element:any) => {
              arrayVacio.push(Object.assign({},element));
            });
            this.listaIntentosTabla = arrayVacio.reverse();
          }
        })
      });
      
      const datePipe = new DatePipe("en-US");
      // obtiene array de las fechas unicas
      const unique = [...new Set(val.map((item: { fecha: any; }) => datePipe.transform(item.fecha, 'dd/MM/yyyy')))];
      // console.log("unique",unique);
      // cuenta los itentos segun la fecha y se agrega en un array
      var intentosArray: any = []
      var rangosArray: any = []
      var intentos = 0
      var rango1 = 0
      var rango2 = 0
      var rango3 = 0
      var rango4 = 0
      var rango5 = 0
      console.log("valor pies",val)
      
      val.forEach((item_sub: any) => {
        switch (parseInt(item_sub.promedio)) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            rango1++
            break;
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            rango2++
            break;
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
            rango3++
            break;
          case 16:
          case 17:
          case 18:
          case 19:
            rango4++
            break;
          case 20:
            rango5++
            break;
        }
      });
      rangosArray.push(rango1, rango2, rango3, rango4, rango5)
      console.log("rangos",rangosArray);

      unique.forEach(item => {
        intentos = 0;
        val.forEach((item_sub: any) => {
          var fecha: any = datePipe.transform(item_sub.fecha, 'dd/MM/yyyy')
          if (item == fecha) {
            intentos++
          }
        });
        intentosArray.push(intentos)
      });
      // 

      // carga los datos de la linea de tiempo
      this.datosGrafico.labels = unique;
      this.datosGrafico.datasets[0].data = intentosArray;
      this.reporteTiempo.cargaGrafico()
      //       

      // craga los datos del pie
      this.datosGraficoPie.datasets[0].data = rangosArray
      this.reportePaste.pieChartBrowser()
      // 

    })

    this.usuarioSeleccionado = e

  }
  validarRol() {
    return this.usuarioRol != 'Estudiante' ? true : false;
  }
  validarUsuarioSeleccionado() {
    return this.usuarioSeleccionado != '' ? true : false;
  }

}
