import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { global } from '../../../services/global';


@Component({
  selector: 'app-carrusel-home',
  templateUrl: './carrusel-home.component.html',
  styleUrls: ['./carrusel-home.component.css']
})
export class CarruselHomeComponent implements OnInit,OnDestroy  {

  private subscription: Subscription;
  public contador:number;
  public sliders:any[];
  public sliderActual:any|undefined;
  public urlRecursosGeneral:string;

  constructor(public generalSevice:GeneralService) {

    this.urlRecursosGeneral = global.urlRecursosGeneral;
    this.sliderActual = undefined;
    this.cargarSliders();
    this.sliders=[];
    this.contador = 0;
    this.subscription = interval(5000)
        .subscribe(x => { this.cambiarSlider(); });
   }

  ngOnInit() {

 }

 cargarSliders():void{
  this.generalSevice.obtenerSliders(undefined).subscribe(response=>
    {
      if(response.status == 'ok' && response.sliders)
      {
        this.sliders = response.sliders; 
        if(this.sliders && this.sliders.length > 0)
        {
          this.sliderActual = this.sliders[0];
        }   
      }
    },
    error=>
    {
      console.log(error);
    }
    );
}

 private cambiarSlider () {
  
  if(this.sliders && this.sliders.length > 0)
  {
    this.contador++;
    if(this.contador > this.sliders.length-1)
        this.contador = 0;
    this.sliderActual = this.sliders[this.contador];
  }
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
