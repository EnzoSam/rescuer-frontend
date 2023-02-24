import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/authService.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-postulaciones-usuario',
  templateUrl: './postulaciones-usuario.component.html',
  styleUrls: ['./postulaciones-usuario.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PostulacionesUsuarioComponent  implements OnInit {

  public postulaciones:any[];
  displayedColumns: string[] = ['fecha', 'animal', 'estado'];
  expandedElement: any | null;  


  constructor(public _usuarioService:UsuarioService,
    private _authService:AuthService,
    public dialog: MatDialog) { 
    this.postulaciones = [];    
  }

  ngOnInit(): void {

    this.cargarPostulaciones();
  }


  cargarPostulaciones():void{
    this._usuarioService.obtenerPostulaciones(this._authService.getIdentity()._id).subscribe(response=>
      {
        if(response.status == 'ok' && response.postulaciones)
        {
          this.postulaciones = response.postulaciones;    
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

      /*
      const dialogRef =this.dialog.open(DetalleSliderComponent, {
        data: {
         slider: this.expandedElement
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });*/
    }
  }

  eliminar()
  {

  }

  nuevo()
  {

  }

}