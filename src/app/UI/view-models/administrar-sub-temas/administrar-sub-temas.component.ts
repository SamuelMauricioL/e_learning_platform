import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubTemaConvert, SubTemaModel } from 'src/app/domain/models/SubTema/subtema-model';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';

@Component({
  selector: 'app-administrar-sub-temas',
  templateUrl: './administrar-sub-temas.component.html',
  styleUrls: ['./administrar-sub-temas.component.scss']
})
export class AdministrarSubTemasComponent implements OnInit {

  constructor(
    private service: GetSubTemasUseCases,
    private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute,
    private servicePre: GetPreguntasUseCases,
  ) { 
    this.managerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      idTema: new FormControl('', Validators.required),
      indice: new FormControl('', Validators.required),
      subtema: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      dificultad: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      posicionRuta: new FormControl('', Validators.required),
    })
  }

  idTema: string = this.route.snapshot.params.idTema;
  name_tema: string = this.route.snapshot.params.tema;
  type_user: string = this.route.snapshot.params.typeUser;

  collection = [] as SubTemaModel[];
  actualizar: boolean = false;
  managerForm: FormGroup;
  list_len = 0;
  posicionSeleccionada = "aleatorio";
  ngOnInit(): void {
    // LISA DE SUBTEMAS
    this.service.getAll(this.idTema).subscribe(resp => {
      console.log(resp)
      this.collection = resp;
      this.list_len = resp.length;
    },
      error => {
        console.error(error);
      });
      localStorage.setItem("administrar-sub-temas",JSON.stringify({
        idTema:this.idTema,
        tema:this.name_tema
      }))
  }

  navigate(id_subtema: string, name_subtema: string, type_user: string) {
    if (type_user == 'Estudiante'){
      this.router.navigate(['responder-preguntas']);
    } else {
      this.router.navigate(['administrar-preguntas', id_subtema, name_subtema, type_user]);
    }
  }

  eliminar(item: any,e:any): void {
    // encontrar subtemas 
    let padre = e.target.parentNode
    let spinner = padre.querySelector(".spinner-tema")
    let message = padre.querySelector(".message")
    spinner.classList.remove("d-none")
    this.servicePre.getAll(item.id).subscribe((val:any)=>{
      spinner.classList.add("d-none")
      console.log(val)
      if(val.length > 0){
        message.classList.remove("d-none");
        setTimeout(() => {
          message.classList.add("d-none");
        }, 1500);
      }else{
        this.service.delete(item.id);
      }
    })
    // this.service.delete(item.id);
  }

  guardar(): void {
    const {id, ...obj} = this.managerForm.value;
    obj.estado = true;
    obj.indice = this.list_len ;
    obj.idTema = `/Temas/${this.idTema}`;
    obj.posicionRuta = this.posicionSeleccionada;
    this.service.create(obj).then((_response) => {
      this.managerForm.reset();
      this.modalService.dismissAll();
    }).catch((error) => {
      console.error(error);
    });
  }

  actualiza() {
    const {id, ...obj} = this.managerForm.value;
    this.service.update(id, obj).then((_response) => {
      this.managerForm.reset();
      this.modalService.dismissAll();
    }).catch((error) => {
      console.error(error);
    })
  }

  // MODAL
  openSave(content: any) {
    this.actualizar = false;
    this.managerForm.reset();
    this.openModal(content);
  }

  openEditar(content: any, item: SubTemaModel) {
    this.actualizar = true;
    this.managerForm.setValue(SubTemaConvert.fromObjectToJson(item));
    this.openModal(content);
  }

  closeResult = '';
  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  changePosicion(e:any){
    this.posicionSeleccionada=e.target.value
  }
}
