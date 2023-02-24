import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from 'src/app/services/general.service';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public page_title: string;
  public page_subTitle: string;
  public contacto1:string;
  public usuario:Usuario;
  public tiposContactos:any[];
  public provincias:any[];
  public ciudades:any[];
  public provinciaElejida:any;

  constructor(private _userService:UsuarioService, private _generalService:GeneralService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.page_title = 'Registrate';
    this.page_subTitle = 'Ingresa tus datos para registrarte en la plataforma';
    this.usuario = new Usuario(undefined,'','','','ROLE_USER','','','','',undefined,[]);    
    this.tiposContactos = [];
    this.contacto1 = '';
    this.provincias = [];
    this.ciudades = [];
  }

  ngOnInit() {
    console.log('Registro de usuario componente cargado');
    this.CargarContactos();
    this.CargarProvinvias();
  }

  
  onSubmit(form:any)
  {
    this.usuario.apodo = this.usuario.nombres + ' ' + this.usuario.apellidos;

    if(this.tiposContactos && this.tiposContactos.length > 0 && this.contacto1 && this.contacto1 != '')
    {
      let contact = new Contacto(undefined,this.contacto1,'',0,true, this.tiposContactos[0]);
      this.usuario.contactos = [];
      this.usuario.contactos.push(contact); 
    }

    this._userService.registrar(this.usuario).subscribe(
      response=>{

        if(response.status == "ok")
        {          
          let m = this.usuario.email;
         //form.reset();
          this._router.navigate(['usuario/validar-cuenta',m]);
        }
        else{
          this.openSnackBar("Error. " + response.message); 
        }        
      },
      error=>{
        this.openSnackBar("Error");
        console.log(error);
      }
    );    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,undefined,{duration:3000});
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
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  } 

  CargarCiudades(provincia:any) {

    this.ciudades = [];
    if(provincia)
    {
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
    return (!o1&& !o2) || (o1  && o2 && o1._id === o2._id);
  } 

  cambioProvincia(provincia:any)
  {
    this.ciudades = [];
    if(provincia)
      this.CargarCiudades(provincia);
  }

}
