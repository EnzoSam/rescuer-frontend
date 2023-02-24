import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { global } from 'src/app/services/global';
import { ITipo } from '../seleccion-tipo/itipo';

@Component({
  selector: 'app-card-tipo-seleccion',
  templateUrl: './card-tipo-seleccion.component.html',
  styleUrls: ['./card-tipo-seleccion.component.css']
})
export class CardTipoSeleccionComponent implements OnInit {

  @Input() tipo:ITipo|undefined;
  @Output() tipoClick:EventEmitter<ITipo> = new EventEmitter<ITipo>();
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.tipo);
  }

  imagen():string
  {
    if(!this.tipo?.imagen)
      return '';
    else if(this.tieneUrlImagen())
      return global.urlRecursosGeneral + this.tipo.imagen;
    else
        return this.tipo.imagen;
  }

  tieneUrlImagen():boolean
  {
    return ((this.tipo?.imagen + '').indexOf('.') >= 0);
  }

  onClick()
  {
    this.tipoClick.emit(this.tipo);
  }
}
