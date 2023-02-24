import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TipoLugar } from 'src/app/models/tipoLugar';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-detalle-tipos-lugares',
  templateUrl: './detalle-tipos-lugares.component.html',
  styleUrls: ['./detalle-tipos-lugares.component.css']
})
export class DetalleTiposLugaresComponent implements OnInit {

  public tipoLugar:any;
  page_title:string;
  page_subTitle:string;
  todosLosTipos:any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public generalService:GeneralService)
  {    
    this.page_subTitle = 'Ingrese los datos del tipo de lugar';
    if(data.tipoLugar && data.tipoLugar != undefined)
    {
      this.tipoLugar = data.tipoLugar;
      this.page_title = 'Editar Tipo Lugar';
    }
    else
    {
      this.tipoLugar = new TipoLugar(0,'','',null,null,0);
      this.page_title = 'Nuevo Tipo Lugar';
    }
      this.todosLosTipos=[];
  }

  ngOnInit(): void {
    this.cargarTiposLugares();
  }

  onSubmit()
  {
    this.generalService.nuevoTipoLugar(this.tipoLugar).subscribe
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

  cargarTiposLugares():void{
    this.generalService.obtenerTiposLugares().subscribe(response=>
      {
        if(response.status == 'ok' && response.tiposLugares)
        {
          this.todosLosTipos = response.tiposLugares;    
        }
      },
      error=>
      {
        console.log(error);
      }
      );
  }  

}
