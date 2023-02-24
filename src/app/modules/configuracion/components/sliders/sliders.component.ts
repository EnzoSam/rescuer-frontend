import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import { DetalleSliderComponent } from '../detalle-slider/detalle-slider.component';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SlidersComponent implements OnInit {

  public sliders:any[];
  displayedColumns: string[] = ['orden', 'titulo'];
  expandedElement: any | null;  

  constructor(public generalService:GeneralService,public dialog: MatDialog) { 
    this.sliders = [];    
  }

  ngOnInit(): void {

    this.cargarSliders();
  }


  cargarSliders():void{
    this.generalService.obtenerSliders(undefined).subscribe(response=>
      {
        if(response.status == 'ok' && response.sliders)
        {
          this.sliders = response.sliders;    
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

      const dialogRef =this.dialog.open(DetalleSliderComponent, {
        data: {
         slider: this.expandedElement
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

    this.generalService.eliminarSlider(this.expandedElement._id).subscribe(response=>
      {
        if(response.status === 'ok')
            this.cargarSliders();
          else
          console.log(response.error.message);
      },
      error=>
      {
        console.log(error);
      })

  }

  nuevo()
  {


      const dialogRef =this.dialog.open(DetalleSliderComponent, {
        data: {
          slider: undefined
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarSliders();
      });
    
  }

}