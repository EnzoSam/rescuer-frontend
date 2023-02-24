import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-opcion-alerta',
  templateUrl: './opcion-alerta.component.html',
  styleUrls: ['./opcion-alerta.component.css']
})
export class OpcionAlertaComponent implements OnInit {

  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() icono = '';

  constructor() { }

  ngOnInit(): void {
  }

}
