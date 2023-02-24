import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { PanelConfiguracioesComponent } from '../configuracion/components/panel-configuracioes/panel-configuracioes.component';
import { DetalleAtributoComponent } from '../configuracion/components/detalle-atributo/detalle-atributo.component';
import { TiposAnimalesComponent } from '../configuracion/components/tipos-animales/tipos-animales.component';
import { DetalleTipoAnimaleComponent } from '../configuracion/components/detalle-tipo-animale/detalle-tipo-animale.component';
import { TiposContactosComponent } from '../configuracion/components/tipos-contactos/tipos-contactos.component';
import { DetalleTipoContactoComponent } from '../configuracion/components/detalle-tipo-contacto/detalle-tipo-contacto.component';
import { LugaresComponent } from '../configuracion/components/lugares/lugares.component';
import { DetalleLugarComponent } from '../configuracion/components/detalle-lugar/detalle-lugar.component';
import { TiposLugaresComponent } from '../configuracion/components/tipos-lugares/tipos-lugares.component';
import { DetalleTiposLugaresComponent } from '../configuracion/components/detalle-tipos-lugares/detalle-tipos-lugares.component';
import { SlidersComponent } from '../configuracion/components/sliders/sliders.component';
import { DetalleSliderComponent } from '../configuracion/components/detalle-slider/detalle-slider.component';
import { DatosUtilesAdminComponent } from '../configuracion/components/datos-utiles-admin/datos-utiles-admin.component';
import { DetalleDatoUtilComponent } from '../configuracion/components/detalle-dato-util/detalle-dato-util.component';
import { AtributoComponent } from './components/atributo/atributo.component';

//DEFINIR LAS RUTAS
const appRoutes: Routes = [


    //{path:'',component:InicioComponent},
//    {path:'**',component:ErrorPredeterminadoComponent}

//{ path: '', component: PanelConfiguracioesComponent},
{ path: 'atributos',component: AtributoComponent},
{ path: 'tipos-animales', component: TiposAnimalesComponent},
{ path: 'tipos-contactos',component: TiposContactosComponent},
{ path: 'lugares',component: LugaresComponent},
{ path: 'tipos-lugares', component: TiposLugaresComponent},
{ path: 'sliders',component: SlidersComponent},
{ path: 'datos-utiles', component: DatosUtilesAdminComponent},

];


//EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders<any> = RouterModule.forChild(appRoutes);
