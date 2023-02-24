import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { RUTE_PARAMS } from 'src/app/constants/routes.constants';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { GeneralService } from 'src/app/services/general.service';
import { ITipo } from '../seleccion-tipo/itipo';

@Component({
  selector: 'app-stepper-publicacion',
  templateUrl: './stepper-publicacion.component.html',
  styleUrls: ['./stepper-publicacion.component.css']
})
export class StepperPublicacionComponent implements OnInit {

  arrayTiposAnimales:any[]=[];
  animal:Animal;
  public sexos: any[]=[];
  public tamanios:any[]=[];
  tipoAlerta: number = 0;
  esEdicion = false;
  
  constructor(private generalService: GeneralService, private animalService:AnimalService,
    private _router: Router, private _route: ActivatedRoute) {
      this.animal = animalService.instanciarAnimal();
   }

  ngOnInit(): void {
    this.cargarTiposAnimales();
    this.CargarSexosAnimales();
    this.cargarTamanios();
    
    this.tipoAlerta = +this._route.params.subscribe((params)=>
    {
        this.tipoAlerta = params[RUTE_PARAMS.tipoPublicacion];  
        this.animal.estado = this.tipoAlerta;  
    });
  }

  cargarTiposAnimales()
  {
    this.generalService.obtenerTiposAnimales().subscribe(
      response => {
        if (response.status == 'ok') {
          this.arrayTiposAnimales  =response.tiposAnimales;
        }
      },
      error => {
        console.log(error);
      });
  }

  CargarSexosAnimales() {
    this.generalService.obtenerAtributos("Sexo").subscribe(
      response => {
        if (response.status == "ok") {
          this.sexos = response.atributos;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  cargarTamanios() {

    this.generalService.obtenerAtributos('Tamanio').subscribe(
      response => {
        if (response.status == "ok") {
          this.tamanios = response.atributos;
          this.cargarAnimalEdicion();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  obtenerListITipoAnimal()
  {
    let array:ITipo[] = [];
    for(let t of this.arrayTiposAnimales)
    {            
        array.push(
          {
            id:t._id,
            titulo:t.nombre,
            imagen:t.imagen,
            descripcion:t.descripcion
          }
        );
    }

    return array;
  }

  obtenerListSexoAnimal()
  {
    let array:ITipo[] = [];
    for(let t of this.sexos)
    {            
        array.push(
          {
            id:t._id,
            titulo:t.nombre,
            imagen:t.imagen,
            descripcion:t.imagen
          }
        );
    }

    return array;
  }

  obtenerListTamanio()
  {
    let array:ITipo[] = [];
    for(let t of this.tamanios)
    {            
        array.push(
          {
            id:t._id,
            titulo:t.nombre,
            imagen:t.imagen,
            descripcion:t.descripcion
          }
        );
    }

    return array;
  }  

  tipoAnimalClick(tipo:ITipo, stepper:MatStepper)
  {
      let tipoAnimal = this.arrayTiposAnimales.find(t=>t._id = tipo.id)
      this.animal.tipoAnimal= tipoAnimal;
      stepper.next();
  }

  sexoClick(tipo:ITipo, stepper:MatStepper)
  {
      let s = this.sexos.find(t=>t._id = tipo.id)
      this.animal.sexo = s;
      stepper.next();
  }

  tamanioClick(tipo:ITipo, stepper:MatStepper)
  {
      let t = this.tamanios.find(t=>t._id = tipo.id)
      this.animal.tamanio = t;
      stepper.next();
  }  

  completoNombre(stepper:MatStepper):void
  {
    stepper.next();
  }

  imagenSubida(stepper:MatStepper):void
  {
    stepper.next();
  }

  cargarAnimalEdicion() {
    
    this._route.params.subscribe(params => {
      let id = params['id'];
      if (id && id != null && id != 0) {
        this.esEdicion = true;
        this.animalService.obtenerAnimal(id).subscribe(
          response => {
            if (response.status == 'ok' && response.animal) {
              this.animal = response.animal;

              if(this.animal.estado)
                this.tipoAlerta = this.animal.estado;
            }
            else {
              console.log('error' + response);
            }
          },
          error => {
            console.log('error' + <any>error);
          }
        )
      }
    })
  }  
}
