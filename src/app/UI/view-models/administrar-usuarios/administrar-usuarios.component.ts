import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel, UsuarioConvert } from 'src/app/domain/models/Usuario/usuario-model';
import { GetUserUseCases } from 'src/app/domain/usecase/get-user-use-case';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent implements OnInit {

  managerUsersForm: FormGroup;

  //Variables para el diseño
  closeResult = '';
  config: any;
  collection = { count: 15, data: [] as UsuarioModel[] }
  actualizar: boolean;

  constructor(
    private modalService: NgbModal,
    private userService: GetUserUseCases,
  ) {
    this.actualizar = false;
    this.managerUsersForm = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      grado: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      estado: new FormControl(true, Validators.required),
    })
  }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(resp => {
      this.collection.data = resp;
    },
      error => {
        console.error(error);
      });

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

  }

  pageChanged(event: any) {
    this.config.currentPage = event
  }

  eliminar(item: any): void {
    this.userService.deleteUser(item.id);
  }

  guardarEstudiante(): void {
    const {id, ...obj} = this.managerUsersForm.value;
    obj.estado = true;
    this.userService.createUser(obj).then((_response) => {
      this.managerUsersForm.reset();
      this.modalService.dismissAll();
    }).catch((error) => {
      console.error(error);
    });
  }

  actualizarEstudiante() {
    const {id, ...obj} = this.managerUsersForm.value;
    this.userService.updateUser(id, obj).then((_response) => {
      this.managerUsersForm.reset();
      this.modalService.dismissAll();
    }).catch((error) => {
      console.error(error);
    })
  }

  openEditar(content: any, item: UsuarioModel) {
    this.actualizar = true;
    this.managerUsersForm.setValue(UsuarioConvert.fromObjectToJson(item));
    this.openModal(content);
  }

  openSave(content: any) {
    this.actualizar = false;
    this.managerUsersForm.reset();
    this.openModal(content);
  }

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
