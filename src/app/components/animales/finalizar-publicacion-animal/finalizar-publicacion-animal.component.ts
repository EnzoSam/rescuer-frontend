import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-finalizar-publicacion-animal',
  templateUrl: './finalizar-publicacion-animal.component.html',
  styleUrls: ['./finalizar-publicacion-animal.component.css']
})
export class FinalizarPublicacionAnimalComponent implements OnInit {

  @Input() animal:Animal | undefined;
  @Input() esEdicion:boolean = false;

  constructor(private _animalService:AnimalService,private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  guardarAnimal()
  {
    console.log(this.animal);
    if (this.esEdicion) {
      this.actualizar();
    }
    else {
      this.guardar();
    }
  }

  guardar() {

    if(!this.animal)
      return;

    this._animalService.insertar(this.animal).subscribe(
      response => {
        if (response.status == "ok") {
          this._router.navigate(['animal/detalle/', response.animal._id]);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  actualizar() {

    if(!this.animal)
      return;

    console.log('actualizar');
    console.log(this.animal);
    this._animalService.actualizar(this.animal).subscribe(
      response => {
        if (response.status == "ok") {
          this._router.navigate(['animal/detalle/', response.animal._id]);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }  
}
