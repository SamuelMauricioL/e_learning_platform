import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'sortablejs';
import { AlternativaPreguntaModel, ElementosPreguntaModel, PreguntaModel } from 'src/app/domain/models/Pregunta/pregunta-model';
import { GetPreguntasUseCases } from 'src/app/domain/usecase/get-preguntas-use-case';
import { GetSubTemasUseCases } from 'src/app/domain/usecase/get-subtemas-use-case';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  @Input()
  idPregunta:string="";

  
  constructor(
    private service: GetPreguntasUseCases,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private serviceSubtemas : GetSubTemasUseCases,
  ) { }
  pregunta:any = {};
  Alternativas:any;
  idSubTema: string = this.route.snapshot.params.idSubTema;
  subTema:any ;

  ngOnInit(): void {
    this.serviceSubtemas.getOneSubtema(this.idSubTema).subscribe((val:any)=>{
      this.subTema = val;
      // this.getPreguntas();
    })
  }
  getPregunta(){
    console.log("idpregunta",this.idPregunta);
    this.service.getPregunta(this.idPregunta).subscribe((val:any)=>{
      this.pregunta = val;
      console.log(this.pregunta)
      
      this.service.getElementos(this.idPregunta).subscribe((other:any)=>{
        // val.sort((a:any,b:any)=>{
        //   return a.posicion - b.posicion;
        // })
        this.Elementos=other;
        console.log(this.Elementos);
      })
    })
  }

  //==============================================AGREGAR - MODAL ======================
  // ===========================================================================
  public selectorCentral:any;
  openModal(nameModal: string,e:any) {
    this.getPregunta();
    this.selectorCentral=e.target.parentNode.parentNode;
    let modal: any = this.selectorCentral.querySelector(nameModal);
    let contenedor: any = modal.querySelector('.contenedor');
    contenedor.classList.add('activo');
    modal.classList.add('activo');
  }
  closeModal(nameModal: string) {
    
    let modal: any = this.selectorCentral.querySelector(nameModal);
    let contenedor: any = modal.querySelector('.contenedor');
    contenedor.classList.remove('activo');
    modal.classList.remove('activo');

  }
  //=========Alternativa configuración 
  public tipoAlternativa: boolean = true;
  public tipoEntrada: boolean = false

  //select 
  changeSelectAlternativas(e: any) {
    this.preConfigAlternativa()
    
    console.log(e.target.value);
    if (e.target.value == "1") {
      this.tipoAlternativa = true;
      this.tipoEntrada = false;
    } else {
      this.tipoAlternativa = false;
      this.tipoEntrada = true;
    }
  }
  //=========Cargado de Array
  // Array
  public Elementos: any = [
  ]
  public PosicionElemento: any = [1]

  //========= Dragg And Drop de elementos 
  // Opciones de elemento drag androp 
  eventOptions: Options = {
    onUpdate: () => {
      this.Elementos.forEach((element: any, pos: number) => {
        this.Elementos[pos].posicion = pos + 1;
      });
      console.log(this.Elementos)
    },
  };
  eventOptionsOpciones: Options = {
    onUpdate: () => {
      this.AlternativaBoton.forEach((element: any, pos: number) => {
        this.AlternativaBoton[pos].posicion = pos + 1;
      });
      console.log(this.AlternativaBoton)
    },
  };
  draggableOptions: Options = {
    draggable: '.draggable',
    chosenClass: "seleccionado",
    ghostClass: "seleccionado-fantasma"
  };
  //========= Configuración de add de elementos 
  preConfig() {
    // configuracion de plus 
    let elementosPlus: any = this.selectorCentral.querySelectorAll(".pluss-elemento");
    elementosPlus.forEach((one: any, pos: number) => {
      one.classList.remove('ocultar');
    });

    let elementos: any = this.selectorCentral.querySelectorAll(".add-position-elemento");
    elementos.forEach((one: any, pos: number) => {
      //quita todos las clases mostrar
      let find = one.classList.contains('mostrar');
      if (find) {
        one.classList.remove('mostrar');
      }
      //agregar la clase mostrar a las que no tienen
      let find2 = one.classList.contains('ocultar');
      if (!find2) {
        one.classList.add('ocultar');
      }

    });
  }
  ocultarConfig() {
    this.preConfig();
  }

  //cambia si lo quiere subir por pc o por URL 
  public checkImg1: boolean = true;
  public checkImg2: boolean = false;
  ChangeCargaImagen(val: number) {
    this.imgPc = null;
    this.imgLink = "";
    let imgPrevio: any = this.selectorCentral.querySelector("#vistPreviaImg");
    imgPrevio.innerHTML = '';
    if (val == 1) {
      this.checkImg1 = true;
      this.checkImg2 = false;
    } else {
      this.checkImg1 = false;
      this.checkImg2 = true;
    }
  }
  // vista previa de archivo seleccionado
  public imgPc: any = null;
  showImgPc(input: any) {
    console.log(input.target.files[0])
    if (input.target.files && input.target.files[0]) {
      console.log("muestra");
      let read = new FileReader();
      read.onload = (e: any) => {
        // console.log(e);
        let imgPrevio: any = this.selectorCentral.querySelector("#vistPreviaImg");
        imgPrevio.innerHTML = '<img class="img-fluid"   src="' + e.target.result + '" alt="">'

      }

      read.readAsDataURL(input.target.files[0]);
      this.imgPc = input.target.files[0];
    } else {
      let imgPrevio: any = this.selectorCentral.querySelector("#vistPreviaImg");
      imgPrevio.innerHTML = '';
    }
  }
  public imgLink: string = "";
  showImgLink(link: any) {
    console.log(link.value);
    let imgPrevio: any = this.selectorCentral.querySelector("#vistPreviaImg");
    imgPrevio.innerHTML = '<img class="img-fluid"   src="' + link.value + '" alt="">'
    this.imgLink = link.value;
  }

  eventAddImagen() {
    this.preConfig();
    let ownElement: any = this.selectorCentral.querySelector("#plus-imagen");
    ownElement.classList.add('ocultar');
    let elemento: any = this.selectorCentral.querySelector("#addImagenElemento");
    let find = elemento.classList.contains('ocultar');
    if (find) {
      elemento.classList.remove('ocultar');
    }
    elemento.classList.add('mostrar');
  }
  eventAddTexto() {
    this.preConfig();
    let ownElement: any = this.selectorCentral.querySelector("#plus-texto");
    ownElement.classList.add('ocultar');

    let elemento: any = this.selectorCentral.querySelector("#addTextoElemento");
    let find = elemento.classList.contains('ocultar');
    if (find) {
      elemento.classList.remove('ocultar');
    }
    elemento.classList.add('mostrar');
  }
  //pretenecienta para agregar texto entrada 
  public textoEntradaElementos: any = [];
  //agregar texto
  addTextoEntrada() {
    let newTexto = {
      tipo: "texto",
      valor: ""
    }
    this.textoEntradaElementos.push(newTexto);
  }
  //agregar input
  addinputEntrada() {
    //cuenta de inputs en elementos 
    let filtroElementosEntrada:any = this.Elementos.filter((obj: any) => obj.tipoElemento == 'textoEntrada');
    let filtroTextoEntradaInput = null
    if(filtroElementosEntrada.length>0){
      let cor:any=[];
      filtroElementosEntrada.forEach((element:any) => {
        cor = cor.concat(element.valor)
      });
      let values = cor.filter((obj: any) => obj.tipo == 'input');
      let valValues = values.map((val:any)=>{return val.valor});
      filtroTextoEntradaInput = Math.max(...valValues);
    }else{
      filtroTextoEntradaInput = 0;
    }
    console.log("conea",filtroTextoEntradaInput); 
    //contar cuantos inputs hay 
    let filtroInput = this.textoEntradaElementos.filter((obj: any) => obj.tipo == 'input');
    let newInput = {
      tipo: "input",
      valor: filtroTextoEntradaInput + filtroInput.length + 1,
      entrada:"",
    }
    this.textoEntradaElementos.push(newInput);
  }
  //getTexto
  getTexto(e: any, i: any) {
    console.log(e.target.value)
    console.log(i)
    this.textoEntradaElementos[i].valor = e.target.value;
    console.log(this.textoEntradaElementos);
  }
  //eliminar texto
  deleteTextoEntrada(i: any) {
    console.log("borrar");
    this.textoEntradaElementos.splice(i, 1)
  }
  //eliminar input
  deleteInputEntrada(i: any) {
    console.log("borrar2");
    this.textoEntradaElementos.splice(i, 1)
  }
  //evento pluss
  eventAddTextEntrada() {
    this.preConfig();
    this.textoEntradaElementos = [];
    let ownElement: any = this.selectorCentral.querySelector("#plus-texto-entrada");
    ownElement.classList.add('ocultar');

    let elemento: any = this.selectorCentral.querySelector("#addTextoEntradaElemento");
    let find = elemento.classList.contains('ocultar');
    if (find) {
      elemento.classList.remove('ocultar');
    }
    elemento.classList.add('mostrar');
  }
  eventAddDivision() {
    this.preConfig();
    this.addDivider();
  }

  //==agregar elementos 
  //Array de agregado

  //=agregar elemento texto 
  textArea: string = "";
  addTextoElemento(val: any) {
    console.log(val.value);
    let newElemento = {
      tipoElemento: "texto",
      valor: val.value,
      posicion: (this.Elementos.length + 1)
    }
    this.Elementos.push(newElemento);
    this.preConfig();
  }
  public SpinnerStatus: boolean = false;
  addImagenElemento() {

    if (this.checkImg1) {
      if (this.imgPc != null) {
        this.SpinnerStatus = true;
        let file = this.imgPc;
        const filePath = file.name;
        const ref = this.storage.ref("preguntas/" + filePath);
        const task = ref.put(file);
        task.then((val: any) => {
          const ref = this.storage.ref("preguntas/" + filePath);
          console.log(ref.getDownloadURL());
          ref.getDownloadURL().subscribe((ur: any) => {
            this.SpinnerStatus = false;
            let newElemento = {
              tipoElemento: "imagen",
              valor: ur,
              posicion: (this.Elementos.length + 1)
            }
            this.Elementos.push(newElemento);
            console.log(this.Elementos);
            this.preConfig();
          })
        })
      } else {
        //falta el alert que avise
      }
    } else {
      if (this.imgLink != "") {
        this.SpinnerStatus = true;
        let newElemento = {
          tipoElemento: "imagen",
          valor: this.imgLink,
          posicion: (this.Elementos.length + 1)
        }
        this.Elementos.push(newElemento);
        console.log(this.Elementos);
        this.preConfig();
        this.SpinnerStatus = false;
      } else {
        //falta el alert que avise
      }
    }
  }

  addTextoEntradaElemento() {
    let armadoTexto: string = "";
    if (this.textoEntradaElementos.length > 0) {
      let newElemento = {
        tipoElemento: "textoEntrada",
        valor: this.textoEntradaElementos,
        posicion: (this.Elementos.length + 1)
      }
      this.Elementos.push(newElemento);
      console.log(this.Elementos);
      this.preConfig();
    }
    console.log(armadoTexto)

  }
  addDivider() {
    let newElemento = {
      tipoElemento: "divider",
      valor: "",
      posicion: (this.Elementos.length + 1)
    }
    this.Elementos.push(newElemento);
    console.log(this.Elementos);
    this.preConfig();
  }
  // ============Alternativas
  public AlternativaBoton:any = [];
 
  preConfigAlternativa(){
    this.AlternativaBoton=[];
    this.AlternativasEntrada=[];
  }
  //agregar alternativa boton
  addAlternativaBoton(e:any) {
    console.log(e)
    
    this.AlternativaBoton.push({
      posicion:(this.AlternativaBoton.length + 1),
      valor:e.value,
      correcta:"no",
      switchEditar:false,
    })
    let opcionInput:any = this.selectorCentral.querySelector("#opcionInput");
    opcionInput.value="";

  }
  //switch si alternativa opcion es carrecta o no 
  switchCorrecta(pos:number,val:string){
    this.AlternativaBoton[pos].correcta=val;
  }
  //editar alternativa opcion 
  public estadoEditarOpcion:boolean=false;
  switchEditar(pos:number){
    this.AlternativaBoton[pos].switchEditar=true;
    
  }
  updateValorOpcion(pos:number,e:any){
    let contenedor:any = e.target.parentNode.parentNode.parentNode;
    let input = contenedor.querySelector('input');
    this.AlternativaBoton[pos].valor=input.value;
    this.AlternativaBoton[pos].switchEditar=false;

  }
  deleteAlternativaBoton(pos:number){
    this.AlternativaBoton.splice(pos,1);
  }

  //alternativas entrada 
  public AlternativasEntrada:any=[]
  generarAlternativas(){
    this.AlternativasEntrada=[];
    let var2:any=[];
    this.Elementos.forEach((element:any) => {
      var2.push(Object.assign({},element));
    });
    let filtrado:any = var2.filter((val:any)=>val.tipoElemento=="textoEntrada");

    filtrado.forEach((element:any,pos:number) => {
      let filtradoinput = element.valor.filter((val:any)=>val.tipo=="input");
      filtradoinput.forEach((val:any,i:number) => {
        filtradoinput[i].siwtchEntrada=true;;
      });
      filtrado[pos].valor=filtradoinput;
    });
    console.log(filtrado);
    this.AlternativasEntrada=filtrado;

  }

  //alternativas entrada editar 
  public switchEntrada:boolean = false;
  intoEditar(pos:number,i:number){
    this.AlternativasEntrada[pos].valor[i].siwtchEntrada=true;

  }
  editarEntrada(pos:number,i:number,e:any){
    let valor = e.target.parentNode.parentNode.parentNode.querySelector('input').value;
    this.AlternativasEntrada[pos].valor[i].entrada=valor;
    this.AlternativasEntrada[pos].valor[i].siwtchEntrada=false;
  }
  // ======================Eliminar elemento
  deleteElemento(pos:number){
    this.Elementos.splice(pos,1);
    this.generarAlternativas();
  } 

  // ======================editar elemento
  //MODAL EDITAR 
  public switchAgregarEditar:number = 1;
  public textoEntradaEditar:any[] =[] ;
  public posicionEntradaEditar:number=0;
  public textoPlanoEditar:string="";
  switchModalAgregarEditar(nameModal:string,ss:number,i:number){
    let modal: any = this.selectorCentral.querySelector(nameModal);
    let contenedor: any = modal.querySelector('.contenedor');
    contenedor.classList.add('activo');
    modal.classList.add('activo');
    this.switchAgregarEditar=ss;
    this.posicionEntradaEditar=i;
    if(ss==1){
      let textArea:any = this.selectorCentral.querySelector("#floatingTextareaEditar");
      textArea.value=this.Elementos[i].valor
    }else if(ss==2){
      this.textoEntradaEditar=[];
      this.Elementos[i].valor.forEach((element:any) => {
        this.textoEntradaEditar.push(Object.assign({},element));
      });
      
    }

    
  }
  //==========Editar Texto 
  addTextoElementoEditar(textAreaEditar:any){
    this.Elementos[this.posicionEntradaEditar].valor=textAreaEditar.value;
    this.closeModal('#modalAgregarEditar');
  }
  //==========Editar texto entrada 
  //agregar texto
  addTextoEntradaEditar() {
    let newTexto = {
      tipo: "texto",
      valor: ""
    }
    this.textoEntradaEditar.push(newTexto);
  }
  //agregar input
  addinputEntradaEditar() {
    //cuenta de inputs en elementos 
    let copiaElementos:any = []
    this.Elementos.forEach((element:any) => {
      copiaElementos.push(Object.assign({},element));
    });
    copiaElementos.splice(this.posicionEntradaEditar,1);
    console.log("despues de borrar",copiaElementos);
    let filtroElementosEntrada:any = copiaElementos.filter((obj: any) => obj.tipoElemento == 'textoEntrada');
    let filtroTextoEntradaInput = null
    
    if(filtroElementosEntrada.length>0){
      let cor:any=[];

      filtroElementosEntrada.forEach((element:any) => {
        cor = cor.concat(element.valor)
      });
      let values = cor.filter((obj: any) => obj.tipo == 'input');
      let filterMax = values.map((obj:any)=>{ return obj.valor });
      filtroTextoEntradaInput = Math.max(...filterMax);
    }else{
      filtroTextoEntradaInput = 0;
    }
    //contar cuantos inputs hay 
    let filtroInput = this.textoEntradaEditar.filter((obj: any) => obj.tipo == 'input');
    let maxPosEditar=0;
    if(filtroInput.length>0){
      let posEditar = filtroInput.map((obj:any)=>{ return obj.valor });
      maxPosEditar=Math.max(...posEditar);
    }
    let newInput = {
      tipo: "input",
      valor: Math.max(filtroTextoEntradaInput,maxPosEditar)  + 1,
      entrada:"",
    }
    this.textoEntradaEditar.push(newInput);
  }
  //getTexto
  getTextoEditar(e: any, i: any) {
    this.textoEntradaEditar[i].valor = e.target.value;
  }
  //eliminar texto
  deleteTextoEntradaEditar(i: any) {
    console.log("borrar");
    this.textoEntradaEditar.splice(i, 1)
  }
  //eliminar input
  deleteInputEntradaEditar(i: any) {
    console.log("borrar2");
    this.textoEntradaEditar.splice(i, 1)
  }
  addTextoEntradaElementoEditar() {
    console.log("textoEntrada",this.textoEntradaEditar);
    this.Elementos[this.posicionEntradaEditar].valor=[];
    this.textoEntradaEditar.forEach((element:any) => {
      this.Elementos[this.posicionEntradaEditar].valor.push(element)
    });
    this.closeModal('#modalAgregarEditar');

  }
  

  // ============================================
  // =================== agregar elemento ===========
  // =============================================

  addElemento(){
    let descripcion:any = this.selectorCentral.querySelector("#floatingAreaIni");
    

    let newPregunta = {
      idSubTema: "/SubTemas/"+this.idSubTema,
      idTema:this.subTema.idTema,
      indice: "3",
      pregunta: descripcion.value,
      descripcion: descripcion.value,
      alternativas: "borrado",
      respuesta: "borrado",
      estado: true,
      tipoPregunta:"",
    } as PreguntaModel
    let alternativas:any=[]
    if(this.tipoAlternativa){
      newPregunta.tipoPregunta = "alternativa";
      alternativas=this.AlternativaBoton as Array<AlternativaPreguntaModel>;
    }else{
      newPregunta.tipoPregunta = "pregunta";
      let newAlternativasEntrada:any = [];
      this.AlternativasEntrada.forEach((element:any) => {
        newAlternativasEntrada = newAlternativasEntrada.concat(element.valor)
      });
      console.log(newAlternativasEntrada)
      alternativas=newAlternativasEntrada as Array<AlternativaPreguntaModel>;
    }

    let Elementos = this.Elementos as Array<ElementosPreguntaModel>;
    
    console.log({
      pregunta: newPregunta,
      tipoAlternativa:this.tipoAlternativa,
      alternativas:alternativas,
      Elementos:Elementos
    })
    // this.service.create(newPregunta,alternativas,Elementos).then((val:any)=>{
    //   console.log(val)
    //   this.closeModal('#modalAgregar');
    // });
  }
}
