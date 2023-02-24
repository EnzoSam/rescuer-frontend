import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import{FlexLayoutModule, LayoutGapStyleBuilder} from '@angular/flex-layout';
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
//app
import { MenuComponent } from './components/general/menu/menu.component';
import { InicioComponent } from './components/general/inicio/inicio.component';
import { ErrorPredeterminadoComponent } from './components/general/error-predeterminado/error-predeterminado.component';
import { BuscarAnimalComponent } from './components/animales/buscar-animal/buscar-animal.component';
import { AuthGuard } from './services/authGuard.service';
import { ListadoAnimalesComponent } from './components/animales/listado-animales/listado-animales.component';
import { FiltroAnimalesComponent } from './components/animales/filtro-animales/filtro-animales.component';
import { AnimalListadoComponent } from './components/animales/animal-listado/animal-listado.component';
import { AnimalService } from './services/animal.service';
import { NuevaAlertaComponent } from './components/animales/nueva-alerta/nueva-alerta.component';
import { DetalleAnimalComponent } from './components/animales/detalle-animal/detalle-animal.component';
import { SubirArchivoComponent } from './components/general/subir-archivo/subir-archivo.component';
import { CustomLayoutGapStyleBuilder } from './CustomLayoutGapStyleBuilder';
import { CarruselHomeComponent } from './components/general/carrusel-home/carrusel-home.component';
import { AtributoComponent } from './modules/configuracion/components/atributo/atributo.component';
import { PostulacionComponent } from './components/animales/postulacion/postulacion.component';
import { DetallePostualacionComponent } from './components/animales/detalle-postualacion/detalle-postualacion.component';

import { GeneralService } from './services/general.service';

import { ContactoComponent } from './components/general/contacto/contacto.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NoLoginGuard } from './services/noLogin.guard';
import { LoginGuard } from './services/login.guard';
import { DatosUtilesComponent } from './components/general/datos-utiles/datos-utiles.component';
import { ItemMenuComponent } from './components/general/item-menu/item-menu.component';
import { PiePaginaComponent } from './components/general/pie-pagina/pie-pagina.component';
import { OpcionAlertaComponent } from './components/animales/opcion-alerta/opcion-alerta.component';
import { PublicacionComponent } from './components/animales/publicacion/publicacion.component';
import { PublicacionesComponent } from './components/animales/publicaciones/publicaciones.component';
import { PatrocinadoresComponent } from './components/general/patrocinadores/patrocinadores.component';
import { PatrocinadorComponent } from './components/general/patrocinador/patrocinador.component';
import { CardTipoSeleccionComponent } from './components/animales/card-tipo-seleccion/card-tipo-seleccion.component';
import { SeleccionTipoComponent } from './components/animales/seleccion-tipo/seleccion-tipo.component';
import { StepperPublicacionComponent } from './components/animales/stepper-publicacion/stepper-publicacion.component';
import { IngresoIdentificacionAnimalComponent } from './components/animales/ingreso-identificacion-animal/ingreso-identificacion-animal.component';
import { CargaImagenAnimalComponent } from './components/animales/carga-imagen-animal/carga-imagen-animal.component';
import { FinalizarPublicacionAnimalComponent } from './components/animales/finalizar-publicacion-animal/finalizar-publicacion-animal.component';
import { AuthService } from './services/authService.service';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ErrorPredeterminadoComponent,
    BuscarAnimalComponent,
    ListadoAnimalesComponent,
    FiltroAnimalesComponent,
    AnimalListadoComponent,
    NuevaAlertaComponent,
    DetalleAnimalComponent,
    SubirArchivoComponent,
    CarruselHomeComponent,
    AtributoComponent,
    PostulacionComponent,
    DetallePostualacionComponent,
    ContactoComponent,
    DatosUtilesComponent,
    ItemMenuComponent,
    PiePaginaComponent,
    OpcionAlertaComponent,
    PublicacionComponent,
    PublicacionesComponent,
    PatrocinadoresComponent,
    PatrocinadorComponent,
    CardTipoSeleccionComponent,
    SeleccionTipoComponent,
    StepperPublicacionComponent,
    IngresoIdentificacionAnimalComponent,
    CargaImagenAnimalComponent,
    FinalizarPublicacionAnimalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  exports:[
    SubirArchivoComponent
  ],
  providers: 
  [appRoutingProviders,
    AuthGuard,
    AnimalService, 
    GeneralService, 
    AuthService,
    LoginGuard,
    NoLoginGuard,    
    { provide:  LayoutGapStyleBuilder, useClass: CustomLayoutGapStyleBuilder },
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {
      provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true
    }
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
