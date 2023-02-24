import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import { DetalleTipoContactoComponent } from '../detalle-tipo-contacto/detalle-tipo-contacto.component';

@Component({
  selector: 'app-tipos-contactos',
  templateUrl: './tipos-contactos.component.html',
  styleUrls: ['./tipos-contactos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TiposContactosComponent implements OnInit {

  public tiposContactos:any[];
  displayedColumns: string[] = ['orden', 'nombre'];
  expandedElement: any | null;

  constructor(public generalService:GeneralService,public dialog: MatDialog) { 
    this.tiposContactos = [];
  }

  ngOnInit(): void {

    this.cargarTiposContactos();
  }


  cargarTiposContactos():void{
    this.generalService.obtenerTiposContactos().subscribe(response=>
      {
        if(response.status == 'ok' && response.tiposContactos)
        {
          this.tiposContactos = response.tiposContactos;    
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

      const dialogRef =this.dialog.open(DetalleTipoContactoComponent, {
        data: {
         tipoContacto: this.expandedElement
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


      const dialogRef =this.dialog.open(DetalleTipoContactoComponent, {
        data: {
          tipoContacto: undefined
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    
  }

}