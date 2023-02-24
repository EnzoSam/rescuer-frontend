import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import{FlexLayoutModule, LayoutGapStyleBuilder} from '@angular/flex-layout';
import { AngularMaterialModule } from '../../angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CustomLayoutGapStyleBuilder } from 'src/app/CustomLayoutGapStyleBuilder';

import {routing, appRoutingProviders} from './configuracion-routing';

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
import { SubirArchivoConfComponent } from './components/subir-archivo-conf/subir-archivo.component';
@NgModule({
  declarations: [
    PanelConfiguracioesComponent,
    DetalleAtributoComponent,
    TiposAnimalesComponent,
    DetalleTipoAnimaleComponent,
    TiposContactosComponent,
    DetalleTipoContactoComponent,
    LugaresComponent,
    DetalleLugarComponent,
    TiposLugaresComponent,
    DetalleTiposLugaresComponent,
    SlidersComponent,
    DetalleSliderComponent,
    DatosUtilesAdminComponent,
    DetalleDatoUtilComponent,
    SubirArchivoConfComponent
  ],
  imports: [    
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    CommonModule,
    routing
  ],
  providers: [appRoutingProviders, { provide: LayoutGapStyleBuilder, useClass: CustomLayoutGapStyleBuilder }],
})
export class ConfiguracionModule { }
 