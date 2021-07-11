import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubTemaConvert, SubTemaModel } from 'src/app/domain/models/SubTema/subtema-model';
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
    private route: ActivatedRoute,
  ) { 
    this.managerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      idTema: new FormControl('', Validators.required),
      subtema: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
    })
  }

  idTema: string = this.route.snapshot.params.idTema;

  collection = [] as SubTemaModel[];
  actualizar: boolean = false;
  managerForm: FormGroup;

  ngOnInit(): void {
    // LISA DE SUBTEMAS
    this.service.getAll(this.idTema).subscribe(resp => {
      this.collection = resp;
      console.log(this.collection)
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
    obj.idTema = `/Temas/${this.idTema}`;
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

}
