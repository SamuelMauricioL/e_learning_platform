import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministrarUsuariosRoutingModule } from './administrar-usuarios-routing.module';
import { AdministrarUsuariosComponent } from './administrar-usuarios.component';


@NgModule({
  declarations: [
    AdministrarUsuariosComponent
  ],
  imports: [
    CommonModule,
    AdministrarUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class AdministrarUsuariosModule { }
