import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FiltroAnimal } from 'src/app/models/filtroAnimal';
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/models/animal';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublicacion } from 'src/app/models/ipublicacion';
import { GeneralService } from 'src/app/services/general.service';
import { ITipo } from '../seleccion-tipo/itipo';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-buscar-animal',
  templateUrl: './buscar-animal.component.html',
  styleUrls: ['./buscar-animal.component.css']
})

export class BuscarAnimalComponent implements OnInit {

  titulo: string = 'Buscar Animal';
  showFiller = true;
  public publicaciones:IPublicacion[];
  tipoAlerta = 1;    

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private animalService: AnimalService, private generalService:GeneralService,
    private _router: Router,private _route: ActivatedRoute) {
      this.publicaciones = [];

      let p = this._route.snapshot.paramMap.get('estado');
      if(p)
        this.tipoAlerta = +p;
  }

  ngOnInit(): void {



  }

  cambioListado(publicacionesParam:IPublicacion[]) {

    if(publicacionesParam)
    {
      this.publicaciones = publicacionesParam;
    }
    else
    {
      this.publicaciones = [];
    }
  }


}
