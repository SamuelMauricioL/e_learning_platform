import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel, UsuarioConvert } from 'src/app/domain/models/Usuario/usuario-model';
import { GetGradosUseCases } from 'src/app/domain/usecase/get-grados-use-case';
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

  profesorOestudiante : boolean = true;

  grados:any=[];
  gradoSeleccionado:any =[
    {
      id:null
    }
  ]

 
  constructor(
    private modalService: NgbModal,
    private userService: GetUserUseCases,
    private serviceGra : GetGradosUseCases,
    private formBuilder: FormBuilder
  ) {
    this.actualizar = false;
    this.managerUsersForm = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      grado: new FormControl('', Validators.required),
      rol: new FormControl('Estudiante', Validators.required),
      email: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      estado: new FormControl(true, Validators.required),
      grados: new FormControl("", Validators.required),
      nivel:new FormControl("", Validators.required),
    })
    this.getGrados();
  }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(resp => {
      this.collection.data = resp;
    },
      error => {
        console.error(error);
      });

    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

  }

  changeEstadoProfesorEstudiante(e:any){
    console.log(e.target.value)
    this.changeSelectByTipeUser(e.target.value);
  }
  changeSelectByTipeUser(user:string){
    if(user=="Estudiante" || user=="Docente"){
      this.profesorOestudiante= true;
    }else{
      this.profesorOestudiante=false;
    }
  }
  changeSelectGrado(e:any){
    console.log(e.target.value)
    this.cambiarGradoSeleccionado(e.target.value)
  }
  getGrados(){
    this.serviceGra.getAllCursos().subscribe((val)=>{
      console.log(val);
      this.grados = val;
      this.cambiarGradoSeleccionado(val[0].id);
      
      
    })
  }
  cambiarGradoSeleccionado(grado_Id:any){
    console.log(grado_Id);
    this.serviceGra.getGradoById(grado_Id).subscribe((val:any)=>{
      console.log(val);
      this.gradoSeleccionado = [
        {
          grado:val.grado,
          id:grado_Id,
          nivel:val.nivel
        }
      ]
      console.log(this.gradoSeleccionado)
      if(this.profesorOestudiante==true){
        let etiqueta:any = document.querySelector(".gradoSeleccionado")
        etiqueta.value=grado_Id;
      }
      
    })
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
    if(this.profesorOestudiante){
      obj.grados = this.gradoSeleccionado;
    }else{
      obj.grados = "";
    }
    this.userService.createUser(obj).then((_response) => {
      this.managerUsersForm.reset();
      this.modalService.dismissAll();
    }).catch((error) => {
      console.error(error);
    });
  }

  actualizarEstudiante() {
    const {id, ...obj} = this.managerUsersForm.value;
    if(this.profesorOestudiante){
      obj.grados = this.gradoSeleccionado;
    }
    this.userService.updateUser(id, obj).then((_response) => {
      this.managerUsersForm.reset();
      this.modalService.dismissAll();
    }).catch((error) => {
      console.error(error);
    })
  }

  openEditar(content: any, item: UsuarioModel) {
    
    console.log(item);
    this.openModal(content);
    this.changeSelectByTipeUser(item.rol)
    if(item.rol=="Administrador"){
      
      this.cambiarGradoSeleccionado(this.grados[0].id);
    }else{
      if(item.hasOwnProperty('grados') ){
        console.log(item.grados[0].id);
        let id = item.grados[0].id
        this.cambiarGradoSeleccionado(id)
      }
      // this.cambiarGradoSeleccionado(this.grados[0].id);  //aqui está faltando
    }
    this.actualizar = true;
    this.managerUsersForm.setValue(UsuarioConvert.fromObjectToJson(item));
    
    
  }

  openSave(content: any) {
    
    this.actualizar = false;
    this.managerUsersForm.reset();
    this.managerUsersForm.get("rol")?.setValue("Estudiante")
    this.managerUsersForm.get("nivel")?.setValue("muy bajo")
    this.openModal(content);
    this.cambiarGradoSeleccionado(this.grados[0].id);
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


  //=====================================A
}
