import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-datos-utiles',
  templateUrl: './datos-utiles.component.html',
  styleUrls: ['./datos-utiles.component.css']
})
export class DatosUtilesComponent implements OnInit {

  public datos:any[];
  constructor(public generalService:GeneralService) {
    this.datos = [];   
   }

   ngOnInit(): void {

    this.cargarDatos();
  }


  cargarDatos():void{
    this.generalService.obtenerDatosUtiles(1).subscribe(response=>
      {
        if(response.status == 'ok' && response.datos)
        {
          this.datos = response.datos;    
        }
      },
      error=>
      {
        console.log(error);
      }
      );
  }

}
