import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginGuard } from 'src/app/services/login.guard';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PostulacionesUsuarioComponent } from './components/postulaciones-usuario/postulaciones-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ValidarCuentaComponent } from './components/validar-cuenta/validar-cuenta.component';
import { RUTE_PATHS } from './constants/routes.constants';

//DEFINIR LAS RUTAS
const usuariosRoutes: Routes = [
    
    { path: 'perfil', component: PerfilComponent, 
        children:[
                {path:RUTE_PATHS.datosPersonales,component:DatosPersonalesComponent},
                {path:RUTE_PATHS.postulacionesRecibidas,component:PostulacionesUsuarioComponent}
            ]
    },
    {path:'registro', canActivate:[LoginGuard],component:RegistroComponent},
    {path:'login', canActivate:[LoginGuard],component:LoginComponent},
    {path:'login/:modo', canActivate:[LoginGuard],component:LoginComponent}, 
    {path:'validar-codigo/:email/:codigo',component:LoginComponent},
    {path:'logout/:sure',component:LoginComponent},
    {path:'validar-cuenta/:email',component:ValidarCuentaComponent},
    {path:'reset-password/:email/:codigo',component:ResetPasswordComponent}    
];


//EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders<any> = RouterModule.forChild(usuariosRoutes);
