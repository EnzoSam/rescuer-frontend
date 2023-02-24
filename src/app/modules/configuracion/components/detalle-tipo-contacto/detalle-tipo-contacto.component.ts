import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TipoContacto } from 'src/app/models/tipoContacto';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-detalle-tipo-contacto',
  templateUrl: './detalle-tipo-contacto.component.html',
  styleUrls: ['./detalle-tipo-contacto.component.css']
})
export class DetalleTipoContactoComponent implements OnInit {

  public tipoContacto:any;
  page_title:string;
  page_subTitle:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public generalService:GeneralService)
  {
    this.page_subTitle = 'Ingrese los datos del tipo de contacto';
    if(data.tipoContacto && data.tipoContacto != undefined)
    {
      this.tipoContacto = data.tipoContacto;
      this.page_title = 'Editar Tipo Contacto';
    }
    else
    {
      this.tipoContacto = new TipoContacto(0,'','',0);
      this.page_title = 'Nuevo Tipo Contacto';
    }
      
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.generalService.nuevoTipoContacto(this.tipoContacto).subscribe
    (
      response=>
      {
        if(response.status == 'ok')
        {
            console.log('tipo contacto guardado ok');
        }
      },
      error=>
      {
        console.log(error);
      }
    );
  }
}
