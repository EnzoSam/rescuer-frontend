import { Component, Input, OnInit } from '@angular/core';
import { TipoPublicacion } from 'src/app/enums/publicacionEnums';
import { IPublicacion } from 'src/app/models/ipublicacion';
import { AnimalService } from 'src/app/services/animal.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  @Input() publicacion: any | undefined;
  urlImagen = '';
  rutaDetalle = '';

  constructor(animalService: AnimalService) {
  }

  ngOnInit(): void {
    if (this.publicacion.imagen) {
      if (this.publicacion.tipo === TipoPublicacion.Animal)
        this.urlImagen = global.urlRecursosAnimales;
      else if (this.publicacion.tipo === TipoPublicacion.Publicidad)
        this.urlImagen = global.urlRecursosPublicidad;

      this.urlImagen += this.publicacion.imagen;
    }

    if (this.publicacion.tipo === TipoPublicacion.Animal)
      this.rutaDetalle = '../../detalle/';
    else if (this.publicacion.tipo === TipoPublicacion.Publicidad)
      this.rutaDetalle = 'inicio';
  }

  adoptarClick() {

  }

  esPublicidad():boolean
  {
    return this.publicacion.tipo === TipoPublicacion.Publicidad;
  }
}
