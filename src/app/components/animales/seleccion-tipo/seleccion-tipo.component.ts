import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITipo } from './itipo';

@Component({
  selector: 'app-seleccion-tipo',
  templateUrl: './seleccion-tipo.component.html',
  styleUrls: ['./seleccion-tipo.component.css']
})
export class SeleccionTipoComponent implements OnInit {

  @Input() arrayTipos:ITipo[]=[];
  @Output() seleccionoTipo = new EventEmitter<ITipo>();

  constructor(private router:Router, private activatedRoute:ActivatedRoute) {
    this.arrayTipos = this.router?.getCurrentNavigation()?.extras.state as ITipo[];
}

  ngOnInit(): void {
  }

  onSeleccionoTipo(tipo:ITipo)
  {
    this.seleccionoTipo.emit(tipo);
  }

}
