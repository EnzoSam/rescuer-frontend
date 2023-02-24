import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { DatoUtil } from 'src/app/models/datoUtil';

@Component({
  selector: 'app-detalle-dato-util',
  templateUrl: './detalle-dato-util.component.html',
  styleUrls: ['./detalle-dato-util.component.css']
})
export class DetalleDatoUtilComponent implements OnInit {

  public dato:any;
  page_title:string;
  page_subTitle:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DetalleDatoUtilComponent>,
   public generalService:GeneralService)
  {
    this.page_subTitle = 'Ingrese los datos del Dato Util';
    if(data.dato && data.dato != undefined)
    {
      this.dato = data.dato;
      this.page_title = 'Editar Dato Util';
    }
    else
    {
      this.dato = new DatoUtil('','','','','','','',0,0,0,1);
      this.page_title = 'Nuevo Dato Util';
    }
   
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.generalService.nuevoDatoUtil(this.dato).subscribe
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


}
