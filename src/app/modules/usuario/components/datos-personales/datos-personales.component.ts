import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Contacto } from '../../models/contacto';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  public page_title: string;
  public page_subTitle: string;
  public contacto1: Contacto;
  public usuario: Usuario;
  public tiposContactos: any[];
  public provincias: any[] | undefined;
  public ciudades: any[];
  public provinciaElejida: any;

  constructor(private _userService: UsuarioService, private _generalService: GeneralService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.page_title = 'Datos Personales';
    this.page_subTitle = '';
    this.usuario = new Usuario(undefined, '', '', '', 'ROLE_USER', '', '', '', '', undefined, []);
    this.tiposContactos = [];
    this.contacto1 = new Contacto(undefined, '', '', 0, true, undefined);
    this.provincias;
    this.ciudades = [];
  }

  ngOnInit() {
    this.CargarContactos();
    this.CargarProvinvias();
  }

  cargarUsuario() {
    this._userService.getUser(this._userService.getIdentity()._id).subscribe(response => {
      console.log(response);
      if (response.status == 'ok') {
        this.usuario = response.usuario;
        if(this.usuario.lugar)
        {
          this.provinciaElejida = this.usuario.lugar.lugarPadre;
          this.cambioProvincia(this.provinciaElejida);
        }
        if (this.usuario.contactos && this.usuario.contactos.length > 0) {
          this.contacto1 = this.usuario.contactos.find(x => x.esPredeterminado === true);
          if (!this.contacto1)
            this.contacto1 = this.usuario.contactos[0];
        }
      }
      else {
        this.openSnackBar("Error. " + response.message);
      }
    },
      error => {
        this.openSnackBar("Error. " + error.message);
      })
  }

  onSubmit(form: any) {
    this.usuario.apodo = this.usuario.nombres + ' ' + this.usuario.apellidos;

    if (this.tiposContactos && this.tiposContactos.length > 0 && this.contacto1 && !this.contacto1.tipoContacto) {
      this.contacto1.tipoContacto = this.tiposContactos[0];
      if (!this.usuario.contactos || this.usuario.contactos.length === 0) {
        this.usuario.contactos = [];
        this.usuario.contactos.push(this.contacto1);
      }
    }

    this._userService.update(this.usuario).subscribe(
      response => {

        if (response.status == "ok") {
          this.openSnackBar("Los datos se actualizaron correctamente.");
        }
        else {
          this.openSnackBar("Error. " + response.message);
        }
      },
      error => {
        this.openSnackBar("Error");
        console.log(error);
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 3000 });
  }

  CargarContactos() {
    this._generalService.obtenerTiposContactos().subscribe(
      response => {
        if (response.status == "ok") {
          this.tiposContactos = response.tiposContactos;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  CargarProvinvias() {
    this._generalService.obteneresLugaresPaisActual().subscribe(
      response => {

        if (response.status == "ok") {
          this.provincias = response.lugares;
          this.cargarUsuario();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  CargarCiudades(provincia: any) {

    this.ciudades = [];
    if (provincia) {
      this._generalService.obtenerLugares(provincia._id).subscribe(
        response => {
          if (response.status == "ok") {
            this.ciudades = response.lugares;
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return (!o1 && !o2) || (o1 && o2 && o1 == o2) ||(o1 && o2 && o1._id === o2._id);
  }

  cambioProvincia(provincia: any) {
    this.ciudades = [];
    if (provincia)
      this.CargarCiudades(provincia);
  }

}
