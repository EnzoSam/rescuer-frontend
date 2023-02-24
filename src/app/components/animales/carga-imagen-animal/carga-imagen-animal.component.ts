import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { Archivo } from 'src/app/models/archivo';
import { global } from '../../../services/global';

@Component({
  selector: 'app-carga-imagen-animal',
  templateUrl: './carga-imagen-animal.component.html',
  styleUrls: ['./carga-imagen-animal.component.css']
})
export class CargaImagenAnimalComponent implements OnInit {

  @Input() animal:Animal | undefined;
  @Output() onSeleccionoImagen = new EventEmitter<Animal>();
  public urlUploadAnimales: string;
  public urlRecursosAnimales: string;

  constructor() {

    this.urlUploadAnimales = global.urlUploadAnimales;
    this.urlRecursosAnimales = global.urlRecursosAnimales;
   }

  ngOnInit(): void {
  }

  imagenSubida(archivo: Archivo) {
    
    if(this.animal)
      this.animal.imagen = archivo.url;
     
      this.onSeleccionoImagen.emit(this.animal);
  }  
}
