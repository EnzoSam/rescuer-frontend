import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import{Router, ActivatedRoute, Params, NavigationExtras} from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public page_subTitle: string;
  public usuario:Usuario;
  public status: string;
  public identity:any;
  public token:string;
  public validado:boolean;
  public resetPasswordHabilidado:boolean;

  constructor(private _user_Service:UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar) 
    {
      this.validado = false;
      this.page_title = 'Identificate';
      this.page_subTitle = "Ingresa tus datos para acceder a la plataforma y utilizar todas la funcionalidades";
      this.status = '';
      this.token='';
      this.usuario = new Usuario(undefined,'','','','ROLE_USER','','','','',undefined,[]);
      this.resetPasswordHabilidado = false;
    }

  ngOnInit() {
    this.logout();

    if(this._route.snapshot.params.modo && +this._route.snapshot.params.modo == 3)
    {
      this.validado = true;
    }
    else
    {
      if(this._route.snapshot.params.email && this._route.snapshot.params.codigo)
      {
        this.validarCodigo(this._route.snapshot.params.email, this._route.snapshot.params.codigo);

      }
    }
  }

  validarCodigo(email:string,codigo:string)
  {
    console.log(email + " " + codigo);
    this._user_Service.validarCodigoRegistro(email,codigo).subscribe(
      response=>
      {
        console.log(response.estado);
        if(response.status == 'ok')
        {
          if(response.estado == 0)
          {            
            this._router.navigate(['usuario/login',3]);
          }
          else if(response.estado == 3)
          {
            this._router.navigate(['usuario/reset-password',email,codigo]);
          }
        }
        else
        {
          this.openSnackBar('Error. ' + response.message);
        }
      },
      error=>
      {
          this.status = 'error';
          this.openSnackBar('Error.' + error.statusText);
      }
    );
  }
  openSnackBar(message: string) {
    this._snackBar.open(message,undefined,{duration:3000});
  }

  onSubmit(form:any)
  {
    this._user_Service.iniciarSesion(this.usuario, true).subscribe(
      response=>{
        console.log(response);
        if(response.status != 'error')
        {
          console.log(response);
          this.token = response.token;
          console.log(this.token);
          this._user_Service.iniciarSesion(this.usuario, false).subscribe(
            response=>{
              if(response.status == 'ok')
              {
                this.identity = response.usuarioEncontrado;
                console.log(this.identity);
                console.log(this.token);              
                console.log(this.identity);
                localStorage.setItem('token',this.token);
                let a = JSON.stringify(this.identity);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this._router.navigate(['']).then(() => {
                  window.location.reload();
                });
              }
            },
            error=>{              
              this.openSnackBar(error.statusText || 'Error');
              console.log(response);
            }
          )          
        }
        else
        {
          if(response.estado  == 0)
          {
            this._router.navigate(['usuario/validar-cuenta',this.usuario.email]);
          }
          else{
            this.openSnackBar(response.message);
          }
        }
      },
      error=>{
        this.openSnackBar(error.error.message || 'Error');
      }
    )
  }

  logout()
  {
    this._route.params.subscribe(params=>{
      let logout = +params['sure'];

      if(logout == 1)
      {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.identity = null;
        this.token = '';

        this._router.navigate(['']).then(() => {
          window.location.reload();
        });

      }
    })
  }

  registrar()
  {
    this._router.navigate(['usuario/registro']);
  }

  olvidoPassword()
  {
    this.reenviarCodigo();
  }

  reenviarCodigo():void
  {
    this._user_Service.reenviarCodigoActivacion(this.usuario.email,3).subscribe(
      response=>
      {
        if(response.status == 'ok')
        {
          this.resetPasswordHabilidado = true;
        }
      },
      error=>{
        console.log(error);
      })
  }
}
