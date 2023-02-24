import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import { DetalleTipoAnimaleComponent } from '../detalle-tipo-animale/detalle-tipo-animale.component';

@Component({
  selector: 'app-tipos-animales',
  templateUrl: './tipos-animales.component.html',
  styleUrls: ['./tipos-animales.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TiposAnimalesComponent implements OnInit {

  public tiposAnimales:any[];
  displayedColumns: string[] = ['orden', 'nombre', 'referencia'];
  expandedElement: any | null;

  constructor(public generalService:GeneralService,public dialog: MatDialog) { 
    this.tiposAnimales = [];
  }

  ngOnInit(): void {

    this.cargarTiposAnimales();
  }


  cargarTiposAnimales():void{
    this.generalService.obtenerTiposAnimales().subscribe(response=>
      {
        if(response.status == 'ok' && response.tiposAnimales)
        {
          console.log(response.atributos);
          this.tiposAnimales = response.tiposAnimales;    
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

      const dialogRef =this.dialog.open(DetalleTipoAnimaleComponent, {
        data: {
         tipoAnimal: this.expandedElement
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  eliminar()
  {

  }

  nuevo()
  {


      const dialogRef =this.dialog.open(DetalleTipoAnimaleComponent, {
        data: {
          tipoAnimal: undefined
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    
  }

}