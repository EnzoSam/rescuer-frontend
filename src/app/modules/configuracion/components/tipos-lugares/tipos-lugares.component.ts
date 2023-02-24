import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import { DetalleTiposLugaresComponent } from '../detalle-tipos-lugares/detalle-tipos-lugares.component';


@Component({
  selector: 'app-tipos-lugares',
  templateUrl: './tipos-lugares.component.html',
  styleUrls: ['./tipos-lugares.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TiposLugaresComponent implements OnInit {

  public tiposLugares:any[];
  displayedColumns: string[] = ['orden', 'nombre'];
  expandedElement: any | null;

  constructor(public generalService:GeneralService,public dialog: MatDialog) { 
    this.tiposLugares = [];
  }

  ngOnInit(): void {

    this.cargarTiposLugares();
  }


  cargarTiposLugares():void{
    this.generalService.obtenerTiposLugares().subscribe(response=>
      {
        if(response.status == 'ok' && response.tiposLugares)
        {
          this.tiposLugares = response.tiposLugares;    
        }
      },
      error=>
      {
        console.log(error);
      }
      );
  }

  editar()
  {
    if(this.expandedElement)
    {

      const dialogRef =this.dialog.open(DetalleTiposLugaresComponent, {
        data: {
         tipoLugar: this.expandedElement
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  eliminar()
  {
    if (this.expandedElement) {
      this.generalService.eliminarTipoLugar(this.expandedElement._id).subscribe(response => {
        if (response.status == 'ok') {
          this.expandedElement = null;
          this.cargarTiposLugares();
        } 
      },
        error => {
          console.log(error);
        }
      );
    }
  }

  nuevo()
  {


      const dialogRef =this.dialog.open(DetalleTiposLugaresComponent, {
        data: {
          tipoLugar: undefined
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    
  }

}