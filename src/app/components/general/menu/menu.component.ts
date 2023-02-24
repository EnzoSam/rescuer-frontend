import { Component, OnInit, DoCheck } from '@angular/core';
import { global } from '../../../services/global';
import { UsuarioService } from '../../../modules/usuario/services/usuario.service';
import { IItemMenu } from 'src/app/models/menu-item';
import { AuthService } from 'src/app/services/authService.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})



export class MenuComponent {

  public nombreSitio: string;
  public identity: any;
  public menuItems: IItemMenu[];


  constructor(public _authService: AuthService) {

    this.nombreSitio = global.nombreSitio;
    this.identity = null;
    this.loadIdentity();
    this.menuItems = this.getItemsMenu();
  }


  private loadIdentity() {
    this.identity = this._authService.getIdentity();
  }



  private getItemsMenu() {
    //if(this.identity && this.identity != 'undefined')
    //{
    var menuItemsreturn: IItemMenu[] = [];
    menuItemsreturn.push({
      label: 'Inicio',
      icon: '',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route: '',
      items: []
    });


    menuItemsreturn.push(
      {
        label: 'Adopcion',
        icon: '',
        showOnMobile: false,
        showOnTablet: true,
        showOnDesktop: true,
        route: '/animal/buscar/1',
        items: []
      }
    );

    menuItemsreturn.push(
      {
        label: 'Extraviados',
        icon: '',
        showOnMobile: false,
        showOnTablet: true,
        showOnDesktop: true,
        route: '/animal/buscar/2',
        items: []
      }
    );

    menuItemsreturn.push(
      {
        label: 'Contacto',
        icon: '',
        showOnMobile: false,
        showOnTablet: false,
        showOnDesktop: true,
        route: "/general/contacto",
        items: []
      }
    );


    menuItemsreturn.push(
      {
        label: 'Datos Utiles',
        icon: '',
        showOnMobile: false,
        showOnTablet: false,
        showOnDesktop: true,
        route: "/general/datos-utiles",
        items: []
      }
    );



    if (!this.identity)
      menuItemsreturn.push(
        {
          label: 'Iniciar Sesion',
          icon: '',
          showOnMobile: true,
          showOnTablet: true,
          showOnDesktop: true,
          route: '/usuario/login',
          items: []
        }
      );

      var subMenuUsuario: IItemMenu[] = [];
    if (this.identity) {
      subMenuUsuario.push(
        {
          label: 'Nueva Alerta',
          icon: '',
          showOnMobile: true,
          showOnTablet: true,
          showOnDesktop: true,
          route: '/animal/nueva-alerta',
          items: []
        }        
      );

      subMenuUsuario.push(
        {
          label: 'Perfil',
          icon: '',
          showOnMobile: true,
          showOnTablet: true,
          showOnDesktop: true,
          route: '/usuario/perfil',
          items: []
        });   

      subMenuUsuario.push(
        {
          label: 'Configuraciones',
          icon: '',
          showOnMobile: this.identity && this.identity.rol === 'ROLE_SUPER',
          showOnTablet: this.identity && this.identity.rol === 'ROLE_SUPER',
          showOnDesktop: this.identity && this.identity.rol === 'ROLE_SUPER',
          route: "/configuracion",
          items: []
        }
      );


      subMenuUsuario.push(
        {
          label: 'Cerrar sesion',
          icon: '',
          showOnMobile: true,
          showOnTablet: true,
          showOnDesktop: true,
          route: '/usuario/logout/1',
          items: []

        });
    }

    if(this.identity)
    menuItemsreturn.push(
      {
        label: this.identity ? this.identity.nombres : '',
        icon: 'account_circle',
        showOnMobile: true,
        showOnTablet: true,
        showOnDesktop: true,
        route: '',
        items: subMenuUsuario
      }
    );
    return menuItemsreturn;
  }


}
