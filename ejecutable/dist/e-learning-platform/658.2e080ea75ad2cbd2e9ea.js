(self.webpackChunke_learning_platform=self.webpackChunke_learning_platform||[]).push([[658],{8658:(t,e,n)=>{"use strict";n.r(e),n.d(e,{AdministrarSubTemasModule:()=>b});var o=n(1116),i=n(2754),r=n(4762),a=n(1462),s=n(2408),c=n(5366),l=n(8553);function g(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"button",8),c.NdJ("click",function(){c.CHM(t);const e=c.oxw(),n=c.MAs(11);return e.openSave(n)}),c._uU(1,"Agregar"),c.qZA()}}function d(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"div",4),c.TgZ(1,"p",14),c.NdJ("click",function(){c.CHM(t);const e=c.oxw().$implicit,n=c.oxw(),o=c.MAs(11);return n.openEditar(o,e)}),c.TgZ(2,"a"),c._uU(3,"Editar"),c._UZ(4,"i",16),c.qZA(),c.qZA(),c.qZA()}}function u(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"div",9),c.TgZ(1,"div",10),c._UZ(2,"img",11),c.TgZ(3,"h2"),c._uU(4),c.qZA(),c.TgZ(5,"div",2),c.YNc(6,d,5,0,"div",12),c.TgZ(7,"div",13),c.TgZ(8,"p",14),c.NdJ("click",function(){const e=c.CHM(t).$implicit,n=c.oxw();return n.navigate(e.id,e.subtema,n.type_user)}),c.TgZ(9,"a"),c._uU(10,"Ver las preguntas"),c._UZ(11,"i",15),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA()}if(2&t){const t=e.$implicit,n=c.oxw();c.xp6(4),c.Oqu(t.subtema),c.xp6(2),c.Q6J("ngIf","Estudiante"!=n.type_user)}}function p(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"button",27),c.NdJ("click",function(){return c.CHM(t),c.oxw(2).guardar()}),c._uU(1,"Guardar"),c.qZA()}}function m(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"button",27),c.NdJ("click",function(){return c.CHM(t),c.oxw(2).actualiza()}),c._uU(1,"Actualizar"),c.qZA()}}function h(t,e){if(1&t&&(c.TgZ(0,"div",17),c.TgZ(1,"h4",18),c._uU(2,"Estudiante create/update"),c.qZA(),c.TgZ(3,"button",19),c.NdJ("click",function(){return e.$implicit.dismiss("Cross click")}),c.TgZ(4,"span",20),c._uU(5,"\xd7"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(6,"div",21),c.TgZ(7,"form"),c.TgZ(8,"div",22),c.TgZ(9,"form",23),c.TgZ(10,"div",22),c.TgZ(11,"label"),c._uU(12,"SubTema"),c.qZA(),c._UZ(13,"input",24),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(14,"div",25),c.YNc(15,p,2,0,"button",26),c.YNc(16,m,2,0,"button",26),c.qZA()),2&t){const t=c.oxw();c.xp6(9),c.Q6J("formGroup",t.managerForm),c.xp6(6),c.Q6J("ngIf",!t.actualizar),c.xp6(1),c.Q6J("ngIf",t.actualizar)}}const f=[{path:"",component:(()=>{class t{constructor(t,e,n,o){this.service=t,this.modalService=e,this.router=n,this.route=o,this.idTema=this.route.snapshot.params.idTema,this.name_tema=this.route.snapshot.params.tema,this.type_user=this.route.snapshot.params.typeUser,this.collection=[],this.actualizar=!1,this.list_len=0,this.closeResult="",this.managerForm=new a.cw({id:new a.NI("",a.kI.required),idTema:new a.NI("",a.kI.required),indice:new a.NI("",a.kI.required),subtema:new a.NI("",a.kI.required),estado:new a.NI("",a.kI.required)})}ngOnInit(){this.service.getAll(this.idTema).subscribe(t=>{this.collection=t,this.list_len=t.length,console.log(this.collection)},t=>{console.error(t)})}navigate(t,e,n){this.router.navigate("Estudiante"==n?["responder-preguntas"]:["administrar-preguntas",t,e,n])}eliminar(t){this.service.delete(t.id)}guardar(){const t=(0,r._T)(this.managerForm.value,["id"]);t.estado=!0,t.indice=this.list_len+1,t.idTema=`/Temas/${this.idTema}`,this.service.create(t).then(t=>{this.managerForm.reset(),this.modalService.dismissAll()}).catch(t=>{console.error(t)})}actualiza(){const t=this.managerForm.value,{id:e}=t,n=(0,r._T)(t,["id"]);this.service.update(e,n).then(t=>{this.managerForm.reset(),this.modalService.dismissAll()}).catch(t=>{console.error(t)})}openSave(t){this.actualizar=!1,this.managerForm.reset(),this.openModal(t)}openEditar(t,e){this.actualizar=!0,this.managerForm.setValue(class{static toWelcome(t){return JSON.parse(t)}static welcomeToJson(t){return JSON.stringify(t)}static fromObjectToJson(t){return JSON.parse(JSON.stringify(t))}}.fromObjectToJson(e)),this.openModal(t)}openModal(t){this.modalService.open(t,{ariaLabelledBy:"modal-basic-title"}).result.then(t=>{this.closeResult=`Closed with: ${t}`},t=>{this.closeResult=`Dismissed ${this.getDismissReason(t)}`})}getDismissReason(t){return t===s.If.ESC?"by pressing ESC":t===s.If.BACKDROP_CLICK?"by clicking on a backdrop":`with: ${t}`}}return t.\u0275fac=function(e){return new(e||t)(c.Y36(l.h),c.Y36(s.FF),c.Y36(i.F0),c.Y36(i.gz))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-administrar-sub-temas"]],decls:12,vars:3,consts:[[1,"col-9"],[1,"header"],[1,"row"],[1,"col-sm-10"],[1,"col-sm-2"],["style","background-color: hsl(180, 62%, 55%) !important","type","button","class","btn btn-success",3,"click",4,"ngIf"],["class","row1-container",4,"ngFor","ngForOf"],["content",""],["type","button",1,"btn","btn-success",2,"background-color","hsl(180, 62%, 55%) !important",3,"click"],[1,"row1-container"],[1,"box","cyan"],["src","https://assets.codepen.io/2301174/icon-supervisor.svg","alt",""],["class","col-sm-2",4,"ngIf"],[1,"col-sm-3"],[1,"card__apply",3,"click"],[1,"fa","fa-eye"],[1,"fa","fa-edit"],[1,"modal-header"],["id","modal-basic-title",1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"form-group"],[3,"formGroup"],["type","text","formControlName","subtema",1,"form-control"],[1,"modal-footer"],["type","button","class","btn btn-outline-dark",3,"click",4,"ngIf"],["type","button",1,"btn","btn-outline-dark",3,"click"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"h1"),c._uU(3),c.qZA(),c.TgZ(4,"div",2),c.TgZ(5,"div",3),c._UZ(6,"p"),c.qZA(),c.TgZ(7,"div",4),c.YNc(8,g,2,0,"button",5),c.qZA(),c.qZA(),c.qZA(),c.YNc(9,u,12,2,"div",6),c.qZA(),c.YNc(10,h,17,3,"ng-template",null,7,c.W1O)),2&t&&(c.xp6(3),c.hij("Tema: ",e.name_tema,""),c.xp6(5),c.Q6J("ngIf","Estudiante"!=e.type_user),c.xp6(1),c.Q6J("ngForOf",e.collection))},directives:[o.O5,o.sg,a._Y,a.JL,a.F,a.sg,a.Fj,a.JJ,a.u],styles:['*[_ngcontent-%COMP%]{--red:#ea5353;--cyan:#45d3d3;--orange:#fcaf4a;--blue:#549ef2;--varydarkblue:#4c4e61;--grayishblue:#a3a5ae;--verylightgray:#fafafa;--weight1:200;--weight2:400;--weight3:600}body[_ngcontent-%COMP%]{font-size:15px;font-family:Poppins,sans-serif;background-color:var(--veryLightGray)}.attribution[_ngcontent-%COMP%]{font-size:11px;text-align:center}.attribution[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#3e52a3}h1[_ngcontent-%COMP%]:first-of-type{font-weight:var(--weight1)}h1[_ngcontent-%COMP%]:first-of-type, h1[_ngcontent-%COMP%]:last-of-type{color:var(--varyDarkBlue)}.header[_ngcontent-%COMP%]{text-align:center;line-height:.8;margin-bottom:10px;margin-top:10px}.header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 auto;line-height:2;color:var(--grayishBlue)}.box[_ngcontent-%COMP%]{border-radius:5px;padding:30px;margin:10px;box-shadow:0 5px 30px -20px}.box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--grayishBlue)}img[_ngcontent-%COMP%]{float:right}.cyan[_ngcontent-%COMP%]{border-top:3px solid var(--cyan)}.red[_ngcontent-%COMP%]{border-top:3px solid var(--red)}.blue[_ngcontent-%COMP%]{border-top:3px solid var(--blue)}.orange[_ngcontent-%COMP%]{border-top:3px solid var(--orange)}h2[_ngcontent-%COMP%]{color:var(--varyDarkBlue);font-weight:var(--weight3)}@media (max-width:400px){h1[_ngcontent-%COMP%]{font-size:1.5rem}}@media (max-width:450px){.box[_ngcontent-%COMP%]{height:200px}}@media (max-width:950px) and (min-width:450px){.box[_ngcontent-%COMP%]{text-align:center;height:180px}}@media (min-width:950px){.row1-container[_ngcontent-%COMP%], .row2-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.box-down[_ngcontent-%COMP%]{position:relative;top:150px}.box[_ngcontent-%COMP%]{width:67%}.header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:30%}}a[_ngcontent-%COMP%]{position:relative;text-decoration:none;color:#330707e6}a[_ngcontent-%COMP%]:after{position:absolute;top:25px;left:0;content:"";width:0;height:3px;background-color:#45d3d3;transition:all .5s}a[_ngcontent-%COMP%]:hover:after{width:100%}.card__apply[_ngcontent-%COMP%]{grid-row:4/5;align-self:center;cursor:pointer}.col-9[_ngcontent-%COMP%]{margin-left:18vw!important;margin-top:-45vw!important;height:40vw!important;width:80%!important;position:absolute;overflow-x:hidden!important;overflow-y:scroll!important}i[_ngcontent-%COMP%]{margin-left:10px}']}),t})()}];let _=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[i.Bz.forChild(f)],i.Bz]}),t})(),b=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[o.ez,_,a.u5,a.UX]]}),t})()}}]);