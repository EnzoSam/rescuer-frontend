import { Component, Input, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-animal-listado',
  templateUrl: './animal-listado.component.html',
  styleUrls: ['./animal-listado.component.css']
})
export class AnimalListadoComponent implements OnInit {

  @Input() animal:Animal;
  public urlRecursos:string

  constructor(private animalService:AnimalService) {
    this.animal = animalService.instanciarAnimal();

    this.urlRecursos = global.urlRecursosAnimales;
   }

  ngOnInit(): void {
  }

  adoptarClick()
  {

  }
}
