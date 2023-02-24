import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lugar } from 'src/app/models/lugar';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-detalle-lugar',
  templateUrl: './detalle-lugar.component.html',
  styleUrls: ['./detalle-lugar.component.css']
})
export class DetalleLugarComponent implements OnInit {

  public lugar: any;
  public lugarPadre: Lugar | undefined;
  page_title: string;
  page_subTitle: string;
  todosLosTipos: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public generalService: GeneralService, public dialogRef: MatDialogRef<DetalleLugarComponent>) {
    this.page_subTitle = 'Ingrese los datos del lugar';
    this.lugarPadre = undefined;
    if (data.lugar && data.lugar != undefined) {
      this.lugar = data.lugar;
      this.page_title = 'Editar Lugar';
    }
    else {
      this.lugar = new Lugar(undefined, '', null,null, []);
      this.page_title = 'Nuevo Lugar';
      this.lugarPadre = data.lugarPadre;      
    }
    this.todosLosTipos = [];
  }

  ngOnInit(): void {
    
    if (this.lugarPadre) {
      this.lugar.tipo = this.lugarPadre.tipo.tipoHijos;
      this.page_title += ' de ' + this.lugarPadre.nombre;
      this.lugar.lugarPadre = this.lugarPadre;
    }

    this.cargarTiposLugares();
  }


  onSubmit() {

    console.log(this.lugarPadre)

  
    if(!this.lugar._id || this.lugar._id === undefined)
    {
      
    this.generalService.nuevoLugar(this.lugar).subscribe
    (
      response => {
        console.log(response);
        if (response.status == 'ok') {
          console.log('lugar guardado ok');
          console.log(response.lugar);
          
          if (this.lugarPadre && this.lugarPadre != undefined) {
            this.dialogRef.close(response.lugar);
          }
          else {this.dialogRef.close();
          }
        }
      },
      error => {
        console.log(error);
      }
    );
    }
    else
    {
      this.generalService.actualizarLugar(this.lugar).subscribe
      (
        response => {
          console.log(response);
          if (response.status == 'ok') {
            console.log('lugar actualizado ok');
            
            this.dialogRef.close();
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cargarTiposLugares(): void {
    this.generalService.obtenerTiposLugares().subscribe(response => {
      if (response.status == 'ok' && response.tiposLugares) {
        this.todosLosTipos = response.tiposLugares;        
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  compareObjects(o1: any, o2: any): boolean {
    return (!o1 && !o2) || (o1 && o2 && o1._id === o2._id);
  }
}
