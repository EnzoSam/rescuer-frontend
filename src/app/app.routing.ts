import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import{InicioComponent} from './components/general/inicio/inicio.component';
import{MenuComponent} from './components/general/menu/menu.component';
import{ErrorPredeterminadoComponent} from './components/general/error-predeterminado/error-predeterminado.component';
import { BuscarAnimalComponent } from './components/animales/buscar-animal/buscar-animal.component';
import { NuevaAlertaComponent } from './components/animales/nueva-alerta/nueva-alerta.component';
import { DetalleAnimalComponent } from './components/animales/detalle-animal/detalle-animal.component';
import { AtributoComponent } from './modules/configuracion/components/atributo/atributo.component';
import { NoLoginGuard } from './services/noLogin.guard';
import { LoginGuard } from './services/login.guard';
import { DatosUtilesComponent } from './components/general/datos-utiles/datos-utiles.component';
import { AuthGuard } from './services/authGuard.service';
import { ContactoComponent } from './components/general/contacto/contacto.component';
import { PanelConfiguracioesComponent } from './modules/configuracion/components/panel-configuracioes/panel-configuracioes.component';
import { SeleccionTipoComponent } from './components/animales/seleccion-tipo/seleccion-tipo.component';
import { StepperPublicacionComponent } from './components/animales/stepper-publicacion/stepper-publicacion.component';
import { RUTE_PATHS, RUTE_PARAMS } from './constants/routes.constants';

//DEFINIR LAS RUTAS
const appRoutes: Routes = [
    {path:'',component:InicioComponent},
    //{path:'inicio',component:InicioComponent},
    
    {path:'animal/buscar/:estado',component:BuscarAnimalComponent},
    {path: RUTE_PATHS.nuevaAlerta + '/:' + RUTE_PARAMS.tipoPublicacion ,canActivate:[NoLoginGuard],component:StepperPublicacionComponent}, 
    {path:'animal/seleccionar-tipo-animal',canActivate:[NoLoginGuard],component:SeleccionTipoComponent}, 
    {path:'animal/editar/:id',canActivate:[NoLoginGuard],component:NuevaAlertaComponent},
    {path:'animal/detalle/:id',canActivate:[NoLoginGuard],component:DetalleAnimalComponent},
    {path:'animal/editar/:id',canActivate:[NoLoginGuard],component:NuevaAlertaComponent},

    { path: 'general/contacto', component: ContactoComponent},
    { path: 'general/datos-utiles', component: DatosUtilesComponent},
    { path: 'configuracion', component:PanelConfiguracioesComponent,
    children:[
        {
            path:'panel',
            loadChildren: ()=> import ('./modules/configuracion/configuracion.module').then((m)=>m.ConfiguracionModule)
        }
    ]},
    { path: 'usuario',
    children:[
        {
            path:'',
            loadChildren: ()=> import ('./modules/usuario/usuario.module').then((m)=>m.UsuarioModule)
        }
    ]},    

    {path:'**',component:ErrorPredeterminadoComponent}
];


//EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes,{ useHash: true });
