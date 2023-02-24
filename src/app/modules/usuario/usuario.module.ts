import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import{FlexLayoutModule, LayoutGapStyleBuilder} from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { PerfilComponent } from './components/perfil/perfil.component';
import {routing, appRoutingProviders} from './usuario-routing';
import { CustomLayoutGapStyleBuilder } from 'src/app/CustomLayoutGapStyleBuilder';
import { UsuarioService } from './services/usuario.service';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ValidarCuentaComponent } from './components/validar-cuenta/validar-cuenta.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { PostulacionesUsuarioComponent } from './components/postulaciones-usuario/postulaciones-usuario.component';
import { PostulacionComponent } from './components/postulacion/postulacion.component';


@NgModule({
  declarations: [
  
    PerfilComponent,
    RegistroComponent,
    LoginComponent,
    ValidarCuentaComponent,
    ResetPasswordComponent,
    DatosPersonalesComponent,
    PostulacionesUsuarioComponent,
    PostulacionComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    routing
  ],
  providers: [appRoutingProviders, UsuarioService,
    { provide: LayoutGapStyleBuilder, useClass: CustomLayoutGapStyleBuilder }],
})
export class UsuarioModule { }
