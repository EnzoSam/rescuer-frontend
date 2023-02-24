import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ɵpatchComponentDefWithScope } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Animal } from 'src/app/models/animal';
import { FiltroAnimal } from 'src/app/models/filtroAnimal';
import { AnimalService } from 'src/app/services/animal.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-filtro-animales',
  templateUrl: './filtro-animales.component.html',
  styleUrls: ['./filtro-animales.component.css']
})
export class FiltroAnimalesComponent implements OnInit, AfterViewInit {

  @Output() listadoResponse = new EventEmitter<any>();
 @Input() paginador?:MatPaginator;
  //@ViewChild(MatPaginator) paginador?: MatPaginator;
  titulo: string = 'Buscar Animal';
  showFiller = false;
  filtro: FiltroAnimal;
  estado:Number;
  provincias:any[];
  ciudades:any[];
  provinciaElejida:any;

  constructor(private breakpointObserver: BreakpointObserver,
    private animalService: AnimalService, public generalService: GeneralService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.filtro = new FiltroAnimal([], [], [],1,1,0, undefined);
    this.estado = 1;
    this.provincias = [];
    this.ciudades = [];
  }


  ngOnInit(): void {

    this.generalService.obtenerTiposAnimales().subscribe(
      response => {
        if (response.status == 'ok') {
          this.filtro.tipos = response.tiposAnimales;
          this.cargarTamanios();
        }
      },
      error => {
        console.log(error);
      });

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;

      let p = this._route.snapshot.paramMap.get('estado');
      if(p)
        this.estado = +p;
  }

  ngAfterViewInit() {
    this.paginador?.page.subscribe(
       (event) => this.filtrar()
    );
  }

  cambioFiltro(): void {
    this.filtrar();

  }

  cargarTamanios() {
    this.generalService.obtenerAtributos('Tamanio').subscribe(
      response => {
        if (response.status == 'ok') {
          this.filtro.tamanios = response.atributos;
          this.cargarSexos();
        }
      },
      error => {
        console.log(error);
      });
  }

  cargarSexos() {
    this.generalService.obtenerAtributos('Sexo').subscribe(
      response => {
        if (response.status == 'ok') {
          this.filtro.sexos = response.atributos;
          this.CargarProvinvias();          
        }
      },
      error => {
        console.log(error);
      });
  }

  filtrar(): void {
    this.animalService.obtenerPublicaciones(this.construirFiltro()).subscribe(response => {
      if (response.publicaciones) {
        this.listadoResponse.emit(response.publicaciones);
      }
      else
      {
        this.listadoResponse.emit([]);
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  construirFiltro(): FiltroAnimal {
    
    console.log("filtraaaaaaaaar");
    let filtroReturn = new FiltroAnimal([], [], [], this.estado,
      this.paginador?.pageIndex,this.paginador?.pageSize, undefined);

    if (this.filtro.tipos) {
      for (let t of this.filtro.tipos) {
        if (t.seleccionado) {
          filtroReturn.tipos.push(t);
        }
      }
    }

    if (this.filtro.tamanios) {
      for (let t of this.filtro.tamanios) {
        if (t.seleccionado) {
          filtroReturn.tamanios.push(t);
        }
      }
    }

    if (this.filtro.sexos) {
      for (let s of this.filtro.sexos) {
        if (s.seleccionado) {
          filtroReturn.sexos.push(s);
        }
      }
    }

    filtroReturn.lugar = this.filtro.lugar;

    return filtroReturn;
  }

  compareObjects(o1: any, o2: any): boolean {
    return (!o1 && !o2) || (o1 && o2 && o1 == o2) ||(o1 && o2 && o1._id === o2._id);
  }

  cambioProvincia(provincia: any) {
    this.ciudades = [];
    if (provincia)
      this.CargarCiudades(provincia);
  }

  CargarProvinvias() {
    this.generalService.obteneresLugaresPaisActual().subscribe(
      response => {

        if (response.status == "ok") {
          this.provincias = response.lugares;
          this.filtrar();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  CargarCiudades(provincia: any) {

    this.ciudades = [];
    if (provincia) {
      this.generalService.obtenerLugares(provincia._id).subscribe(
        response => {
          if (response.status == "ok") {
            this.ciudades = response.lugares;
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }  
}
