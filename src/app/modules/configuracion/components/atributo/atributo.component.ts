import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DetalleAtributoComponent } from '../detalle-atributo/detalle-atributo.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-atributo',
  templateUrl: './atributo.component.html',
  styleUrls: ['./atributo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AtributoComponent implements OnInit {

  public atributos:any[];
  displayedColumns: string[] = ['orden', 'nombre', 'referencia', 'agrupador'];
  expandedElement: any | null;

  constructor(public generalService:GeneralService,public dialog: MatDialog) { 
    this.atributos = [];
  }

  ngOnInit(): void {

    this.cargarAtributos();
  }


  cargarAtributos():void{
    this.generalService.obtenerAtributos('').subscribe(response=>
      {
        if(response.status == 'ok' && response.atributos)
        {
          console.log(response.atributos);
          this.atributos = response.atributos;   
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

      const dialogRef =this.dialog.open(DetalleAtributoComponent, {
        data: {
          atributo: this.expandedElement
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarAtributos();
      });
    }
  }

  eliminar()
  {

  }

  nuevo()
  {


      const dialogRef =this.dialog.open(DetalleAtributoComponent, {
        data: {
          atributo: undefined
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    
  }
}
