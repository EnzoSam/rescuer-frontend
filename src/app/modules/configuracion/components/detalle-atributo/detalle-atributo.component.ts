import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Atributo } from 'src/app/models/atributo';
import { GeneralService } from 'src/app/services/general.service';
import { global } from 'src/app/services/global';
@Component({
  selector: 'app-detalle-atributo',
  templateUrl: './detalle-atributo.component.html',
  styleUrls: ['./detalle-atributo.component.css']
})
export class DetalleAtributoComponent implements OnInit {

  public atributo:any;
  page_title:string;
  page_subTitle:string;
  urlBaseIamgenes:string='';
  esEdicion=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public generalService:GeneralService, public dialogRef: MatDialogRef<DetalleAtributoComponent>)
  {
    this.page_subTitle = 'Ingrese los datos del atributo';
    if(data.atributo && data.atributo != undefined)
    {
      this.atributo = data.atributo;
      this.esEdicion = true;
      this.page_title = 'Editar Atributo';
    }
    else
    {
      this.atributo = new Atributo('','','','',0,'',false);
      this.page_title = 'Nuevo Atributo';
    }
    this.urlBaseIamgenes = global.urlUploadGeneral;
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    if(this.esEdicion)
    {
      this.actualizarAtributo();
    }
    else
    {
      this.insertarAtributo();
    }
  }

  insertarAtributo():void{
    this.generalService.nuevoAtributo(this.atributo).subscribe
    (
      response=>
      {
        if(response.status == 'ok')
        {
            console.log('atributo guardado ok');
        }
      },
      error=>
      {
        console.log(error);
      }
    );
  }

  actualizarAtributo():void{
    this.generalService.actualizarAtributo(this.atributo).subscribe
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
    this.atributo.imagen = archivo.url;
  }
}
