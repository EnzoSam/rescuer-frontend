import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { DetalleDatoUtilComponent } from '../detalle-dato-util/detalle-dato-util.component';

@Component({
  selector: 'app-datos-utiles-admin',
  templateUrl: './datos-utiles-admin.component.html',
  styleUrls: ['./datos-utiles-admin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class DatosUtilesAdminComponent implements OnInit {

  public datos:any[];
  displayedColumns: string[] = ['orden', 'titulo'];
  expandedElement: any | null;  

  constructor(public generalService:GeneralService,public dialog: MatDialog) { 
    this.datos = [];    
  }

  ngOnInit(): void {

    this.cargarDatos();
  }


  cargarDatos():void{
    this.generalService.obtenerDatosUtiles(null).subscribe(response=>
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

  editar()
  {
    if(this.expandedElement)
    {

      const dialogRef =this.dialog.open(DetalleDatoUtilComponent, {
        data: {
         dato: this.expandedElement
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  eliminar()
  {
    if(!this.expandedElement)
      return;
    this.generalService.eliminarDatoUtil(this.expandedElement).subscribe
    (
      response=>
      {
        if(response.status == 'ok')
        {
          this.cargarDatos();
        }
      },
      error=>
      {
        console.log(error);
      }
    );
  }

  nuevo()
  {


      const dialogRef =this.dialog.open(DetalleDatoUtilComponent, {
        data: {
          dato: undefined
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarDatos();
      });
    
  }

}