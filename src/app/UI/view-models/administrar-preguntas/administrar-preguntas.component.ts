import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntaConvert, PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';

@Component({
  selector: 'app-administrar-preguntas',
  templateUrl: './administrar-preguntas.component.html',
  styleUrls: ['./administrar-preguntas.component.scss']
})
export class AdministrarPreguntasComponent implements OnInit {

  constructor(
    private service: GetPreguntasUseCases,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) {
    this.managerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      idSubTema: new FormControl('', Validators.required),
      indice: new FormControl('', Validators.required),
      pregunta: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      alternativas: new FormControl('', Validators.required),
      respuesta: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
    })
  }

  idSubTema: string = this.route.snapshot.params.idSubTema;
  name_subtema: string = this.route.snapshot.params.subtema;

  collection = [] as PreguntaModel[];
  actualizar: boolean = false;
  managerForm: FormGroup;
  list_len = 0;

  ngOnInit(): void {
    console.log(this.idSubTema);
    // LISA DE SUBTEMAS
    this.service.getAll(this.idSubTema).subscribe(resp => {
      this.collection = resp;
      this.list_len = resp.length;
      console.log(this.collection);
      console.log(this.list_len);
    },
      error => {
        console.error(error);
      });
  }

  eliminar(item: any): void {
    this.service.delete(item.id);
  }

  guardar(): void {
    const {id, ...obj} = this.managerForm.value;
    obj.estado = true;
    obj.indice = this.list_len + 1;
    obj.idSubTema = `/SubTemas/${this.idSubTema}`;
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

  openEditar(content: any, item: PreguntaModel) {
    this.actualizar = true;
    this.managerForm.setValue(PreguntaConvert.fromObjectToJson(item));
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
