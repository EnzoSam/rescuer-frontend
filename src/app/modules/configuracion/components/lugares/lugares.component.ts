import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DetalleLugarComponent } from '../detalle-lugar/detalle-lugar.component';
import { Lugar } from 'src/app/models/lugar';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LugaresComponent implements OnInit {

  public lugares: any[];
  displayedColumns: string[] = ['nombre'];
  expandedElement: any | null;
  @Input() lugarPadre: any;

  provinciasServicioNacional: any[];
  ciudadesServicioNacional: any[];

  constructor(public generalService: GeneralService, public dialog: MatDialog) {
    this.lugares = [];
    this.provinciasServicioNacional = [];
    this.ciudadesServicioNacional = [];
  }

  ngOnInit(): void {

    this.cargarLugares();
  }


  cargarLugares(): void {
    let idPadre = this.lugarPadre && this.lugarPadre != undefined ? this.lugarPadre._id : '';
    if (this.lugarPadre) {
      this.lugares = this.lugarPadre.lugares;
    }
    else {
      this.generalService.obtenerLugares(idPadre).subscribe(response => {
        if (response.status == 'ok' && response.lugares) {
          this.lugares = response.lugares;
          console.log(this.lugares);
        }
      },
        error => {
          console.log(error);
        }
      );
    }
  }

  editar() {
    if (this.expandedElement) {

      const dialogRef = this.dialog.open(DetalleLugarComponent, {
        data: {
          lugar: this.expandedElement
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  eliminar() {
    console.log('Eliminaaaaaaaaaaaaar');
    console.log(this.expandedElement);
    if (this.expandedElement) {
      this.generalService.eliminarLugar(this.expandedElement._id).subscribe(response => {
        console.log(response);
        if (response.status == 'ok') {
          this.expandedElement = null;
          this.cargarLugares();
        }
      },
        error => {
          console.log(error);
        }
      );
    }
  }

  nuevo() {

    const dialogRef = this.dialog.open(DetalleLugarComponent, {
      data: {
        lugar: undefined,
        lugarPadre: this.lugarPadre
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log('resuuuuuuuuuuult');
      console.log(result);
      if (this.lugarPadre && result)        
        this.lugarPadre.lugares.push(result);

        console.log(this.lugarPadre);
    });

  }

  cargarDesdeServicioNacional() {
    this.generalService.obtenerTiposLugares().subscribe(response => {
      if (response.status == 'ok' && response.tiposLugares) {
        this.cargarTodoDesdeServicioNacional(response.tiposLugares);
      }
    },
      error => {
        console.log(error);
      }
    );
  }


  eliminarTodo()
  {
    this.generalService.eliminarTodosLosLugares().subscribe(response => {
      if (response.status == 'ok') {
        console.log('Elimino todo ok');
        this.cargarLugares();
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  async cargarTodoDesdeServicioNacional(tiposLugares: any[]) {
    let tipoProvincia: any;
    let tipoCiudad: any;


    for (let t of tiposLugares) {
      if ("provincia" === (t.nombre + "").toLowerCase()) {
        tipoProvincia = t;
      }
      else if ("ciudad" === (t.nombre + "").toLowerCase()) {
        tipoCiudad = t;
      }
    }

    this.generalService.obtenerProvinciasServicioNacional().subscribe(response => {
      if (response) {

        this.provinciasServicioNacional = response.provincias;
        this.generalService.obtenerMunicipiosServicioNacional().subscribe(response => {
          if (response) {
            this.ciudadesServicioNacional = response.municipios;            
            this.parsearProvinciasServicioNacional(tipoProvincia, tipoCiudad);
          }
        },
          errores => {
            console.log(errores);
          }
        );
      }
    },
      errores => {
        console.log(errores);
      }
    );


  }

  parsearProvinciasServicioNacional(tipoProvincia: any, tipoCiudad: any) {
    let provinciasGuardar: Lugar[] = [];
    for (let p of this.provinciasServicioNacional) {
      let provincia = new Lugar(undefined, p.nombre, this.lugares[0], tipoProvincia, []);
      provinciasGuardar.push(provincia);
    }

    this.guardarPronvinciasServicioNacional(provinciasGuardar, tipoCiudad);
  }

  async guardarPronvinciasServicioNacional(provncias: any, tipoCiudad: any) {
    let pais = this.lugares[0];

    this.generalService.nuevoLugar(provncias).subscribe
      (
        response => {

          console.log('provincias okkkkkkkkkkkkkkkkkkkkkk');
          let ciudadesInsert = [];
          if (response.status == 'ok' && response.lugares) {
            for (let p of response.lugares) {
              ciudadesInsert = [];
              for (let c of this.ciudadesServicioNacional) {
                if (c.provincia_nombre === p.nombre) {
                  let ciudad = new Lugar(undefined, c.nombre, p, tipoCiudad, []);
                  ciudadesInsert.push(ciudad);
                }
              }

              this.generalService.nuevoLugar(ciudadesInsert).subscribe
              (
                response => {
        
                },
                error => {
                  console.log(error);
                }
              );              
            }
          }

          console.log(ciudadesInsert);



          
        },
        error => {
          console.log(error);
        }
      );


    //this.guardarLugares(provncias);

    /*
      pais.lugares  = provinciasInsertadas;
   
      console.log(pais);
   
      this.generalService.actualizarLugar(pais).subscribe
      (
        response => {
          console.log(response);
          if (response.status == 'ok') {
            console.log('lugar guardado ok');
            this.expandedElement  = null;
            this.cargarLugares();
          }
        },
        error => {
          console.log(error);
        }
      ); */
  }

  async guardarLugares(lugares: any) {
    console.log('guardandooooooooooooooooooooooooo');
    console.log(lugares);
    let provinciasInsertadas = [];
    for (let provincia of lugares) {
      /*
      let ciudadesInsertadas = [];
      for(let ciudad of provincia.lugares)
      {
        let l = await this.guardarlugar(ciudad);
        console.log(l);
        ciudadesInsertadas.push(l);
      }  
      provincia.lugares = ciudadesInsertadas;*/
      let p = await this.guardarlugar(provincia);
      console.log(p);
      provinciasInsertadas.push(p);
    }

    return provinciasInsertadas;
  }

  async guardarlugar(lugar: any) {
    this.generalService.nuevoLugar(lugar).subscribe
      (
        response => {
          return new Promise<any>((resolve) => {
            resolve(response.lugar);
          });
        },
        error => {
          console.log(error);
        }
      );
  }
} 