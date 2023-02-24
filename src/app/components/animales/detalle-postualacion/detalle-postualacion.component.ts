import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostulacionAdopcion } from 'src/app/models/postulacionAdopcion';
import { AnimalService } from 'src/app/services/animal.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-detalle-postualacion',
  templateUrl: './detalle-postualacion.component.html',
  styleUrls: ['./detalle-postualacion.component.css']
})
export class DetallePostualacionComponent implements OnInit {

  public animal:any;
  public page_title:string;
  public page_subTitle:string;
  public postulacion:any; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public animalService:AnimalService)
  {    
      this.postulacion = data.postulacion;      

      this.page_title = 'Detalle de la postulacion';
      this.page_subTitle = '';
  }

  ngOnInit(): void {
    this.cargarPostulacion();
  }

  cargarPostulacion()
  {
      if(this.postulacion)
      {
        this.animalService.detallePostulacion(this.postulacion._id).subscribe(
          response=>
          {
              if(response.status == 'ok')
              {
                  this.postulacion = response.postulacion;
                  this.animal = this.postulacion.animal;

                  this.page_title = 'Detalle de la postulación ' + this.postulacion.animal.nombres;
                  this.page_subTitle = '';
              }
              else{
                console.log('error' + response);
              }
          },
          error=>{
            console.log('error' +  <any>error);
          }
        )           
      }
  }
}
