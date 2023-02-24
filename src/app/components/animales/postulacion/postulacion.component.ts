import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostulacionAdopcion } from 'src/app/models/postulacionAdopcion';
import { AnimalService } from 'src/app/services/animal.service';
import { GeneralService } from 'src/app/services/general.service';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.css']
})
export class PostulacionComponent implements OnInit {

  public animal:any;
  public page_title:string;
  public page_subTitle:string;
  public postulacion:PostulacionAdopcion; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public generalService:GeneralService, 
  private animalService:AnimalService)
  {    
      this.animal = data.animal;      
      this.postulacion = new PostulacionAdopcion(undefined,'',1,new Date(), this.animal,undefined);      

      this.page_title = 'Postularme para la adopcion de ' + this.animal.nombres;
      this.page_subTitle = 'Ingrese los datos de la postulacion';
  }



  ngOnInit(): void {

  }


  onSubmit()
  {
    this.animalService.insertarPostulacionAdopcion(this.postulacion).subscribe
    (
      response=>
      {
        if(response.status == 'ok')
        {
              console.log('postulacion guardado ok');
        }
      },
      error=>
      {
        console.log(error);
      }
    );
  }
}
