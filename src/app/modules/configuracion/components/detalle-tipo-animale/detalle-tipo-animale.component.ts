import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Atributo } from 'src/app/models/atributo';
import { TipoAnimal } from 'src/app/models/tipoAnimal';
import { GeneralService } from 'src/app/services/general.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-detalle-tipo-animale',
  templateUrl: './detalle-tipo-animale.component.html',
  styleUrls: ['./detalle-tipo-animale.component.css']
})
export class DetalleTipoAnimaleComponent implements OnInit {

  public tipoAnimal:any;
  page_title:string;
  page_subTitle:string;
  urlBaseIamgenes:string='';
  esEdicion =false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DetalleTipoAnimaleComponent>, public generalService:GeneralService)
  {
    this.page_subTitle = 'Ingrese los datos del tipo animal';
    if(data.tipoAnimal && data.tipoAnimal != undefined)
    {
      this.tipoAnimal = data.tipoAnimal;
      this.esEdicion = true;
      this.page_title = 'Editar Tipo Animal';
    }
    else
    {
      this.tipoAnimal = new TipoAnimal(undefined,'',0,false,'');
      this.page_title = 'Nuevo Tipo Animal';
    }
      
    this.urlBaseIamgenes = global.urlUploadGeneral;
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    if(this.esEdicion)
    {
      this.actualizar();
    }
    else
    {
      this.guardarNuevo();
    }
  }

  guardarNuevo()
  {
    this.generalService.nuevoTipoAnimal(this.tipoAnimal).subscribe
    (
      response=>
      {
        if(response.status == 'ok')
        {
          this.dialogRef.close();
        }
      },
      error=>
      {
        console.log(error);
      }
    );
  }
  

  actualizar()
  {
    this.generalService.actualizarTipoAnimal(this.tipoAnimal).subscribe
    (
      response=>
      {
        if(response.status == 'ok')
        {
          this.dialogRef.close();
        }
      },
      error=>
      {
        console.log(error);
      }
    );
  }

  imagenSubida(archivo: any) {
    this.tipoAnimal.imagen = archivo.url;
  }
}
