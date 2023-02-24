import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Archivo } from 'src/app/models/archivo';
import { Slider } from 'src/app/models/slider';
import { GeneralService } from 'src/app/services/general.service';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-detalle-slider',
  templateUrl: './detalle-slider.component.html',
  styleUrls: ['./detalle-slider.component.css']
})
export class DetalleSliderComponent implements OnInit {

  public slider:any;
  page_title:string;
  page_subTitle:string;
  public urlUploadGeneral:string;
  public urlRecursosGeneral:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DetalleSliderComponent>,
   public generalService:GeneralService)
  {

    this.urlUploadGeneral = global.urlUploadGeneral;
    this.urlRecursosGeneral = global.urlRecursosGeneral;

    this.page_subTitle = 'Ingrese los datos del slider';
    if(data.slider && data.slider != undefined)
    {
      this.slider = data.slider;
      this.page_title = 'Editar Slider';
    }
    else
    {
      this.slider = new Slider('','','','',0,0);
      this.page_title = 'Nuevo Slider';
    }
      
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.generalService.nuevoSlider(this.slider).subscribe
    (
      response=>
      {
        if(response.status == 'ok')
        {
          this.dialogRef.close();
        }
        else
        {
          console.log(response.error.message);
        }
      },
      error=>
      {
        console.log(error);
      }
    );
  }

  imagenSubida(archivo: Archivo) {
    this.slider.imagen = archivo.url; 
  }
}
