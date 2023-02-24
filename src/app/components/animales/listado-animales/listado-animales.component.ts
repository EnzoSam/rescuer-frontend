import { Component, Input, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal';

@Component({
  selector: 'app-listado-animales',
  templateUrl: './listado-animales.component.html',
  styleUrls: ['./listado-animales.component.css']
})
export class ListadoAnimalesComponent implements OnInit {

  @Input() listadoAnimales:Animal[]; 

  constructor() 
  {
    this.listadoAnimales = [];
  }

  ngOnInit(): void {
  }

}
