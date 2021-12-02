import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemaModel, TemaConvert } from 'src/app/domain/models/Tema/tema-model';
import { GetTemasUseCases } from 'src/app/domain/usecase/get-temas-use-case';

@Component({
  selector: 'app-administrar-temas',
  templateUrl: './administrar-temas.component.html',
  styleUrls: ['./administrar-temas.component.scss']
})
export class AdministrarTemasComponent implements OnInit {

  constructor(
    private service: GetTemasUseCases,
    private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute,
  ) { 
    this.managerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      curso: new FormControl('', Validators.required),
      tema: new FormControl('', Validators.required),
      orden: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
    })
  }

  
  idGrado: string = this.route.snapshot.params.idGrado;
  idCurso: string = this.route.snapshot.params.idCurso;
  name_curso: string = this.route.snapshot.params.curso;
  type_user: string = this.route.snapshot.params.typeUser;

  collection = [] as TemaModel[]
  actualizar: boolean = false;
  managerForm: FormGroup;

  ngOnInit(): void {
   
    this.service.getAllTemas(this.idGrado, this.idCurso).subscribe(resp => {
      this.collection = resp;
    },
      error => {
        console.error(error);
      });
  }

  navigate(id_tema: string, name_tema: string, orden: string) {
    if (this.type_user == 'Estudiante'){
      this.router.navigate(['responder-preguntas', id_tema, orden]);
    } else {
      this.router.navigate(['administrar-sub-temas', id_tema, name_tema, this.type_user]);
    }    
  }

  eliminar(item: any): void {
    this.service.deleteTema(item.id);
  }

  guardarTema(): void {
    const {id, ...obj} = this.managerForm.value;
    obj.estado = true;
    obj.curso = `/Grados/${this.idGrado}/Cursos/${this.idCurso}`;
    this.service.createTema(obj).then((_response) => {
      this.managerForm.reset();
      this.modalService.dismissAll();
    }).catch((error) => {
      console.error(error);
    });
  }

  actualizarTema() {
    const {id, ...obj} = this.managerForm.value;
    this.service.updateTema(id, obj).then((_response) => {
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

  openEditar(content: any, item: TemaModel) {
    this.actualizar = true;
    this.managerForm.setValue(TemaConvert.fromObjectToJson(item));
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
}
