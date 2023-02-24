import { Component, Input, OnInit } from '@angular/core';
import { IPublicacion } from 'src/app/models/ipublicacion';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent  implements OnInit {

  @Input() publicaciones:any; 

  constructor() 
  {
    this.publicaciones = [];
  }

  ngOnInit(): void {
  }

}
