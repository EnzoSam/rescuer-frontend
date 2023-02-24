import { Component, Input, OnInit } from '@angular/core';
import { IItemMenu } from 'src/app/models/menu-item';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})
export class ItemMenuComponent implements OnInit {

  @Input() itemMenu:IItemMenu | undefined;
  @Input() invert:boolean = false;
  constructor(
    
  ) { }

  ngOnInit(): void {
  }

}
