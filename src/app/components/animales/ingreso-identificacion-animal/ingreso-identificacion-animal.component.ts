import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-ingreso-identificacion-animal',
  templateUrl: './ingreso-identificacion-animal.component.html',
  styleUrls: ['./ingreso-identificacion-animal.component.css']
})
export class IngresoIdentificacionAnimalComponent implements OnInit {

  @Input() animal:Animal | undefined;
  @Input() esEdicion = false;
  @Output() onSiguiente = new EventEmitter<Animal>();
  
  tieneNombre:boolean|undefined;
  public labelNombre = 'Nombre';

  constructor() { }

  ngOnInit(): void {

    if(this.esEdicion && this.animal && this.animal.nombres && this.animal.nombres != '')
    {
      this.tieneNombre = true;
    }
  }

  siClick()
  {
    this.tieneNombre = true;
  }

  noClick()
  {
    this.tieneNombre = false;
    this.labelNombre = "Titulo de la publicación";
  }

  siguiente():void{

    this.onSiguiente.emit(this.animal);
  }
}
