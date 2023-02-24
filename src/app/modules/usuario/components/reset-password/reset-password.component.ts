import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public page_title: string;
  public page_subTitle: string;
  public email:string;
  public codigo:string;
  public password:string;
  public  passwordConfirmacion:string;

  constructor(private _user_Service:UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar) { 

      this.page_title = 'Cambiar Contraseña';
      this.page_subTitle = 'Ingresá tu nueva contraseña';
      this.email = '';
      this.codigo = '';
      this.password = '';
      this.passwordConfirmacion = '';
    }

  ngOnInit(): void {
    if(this._route.snapshot.params.email && this._route.snapshot.params.codigo)
    {
      this.email = this._route.snapshot.params.email;
      this.codigo = this._route.snapshot.params.codigo;

    }
  }

  onSubmit()
  {
    this._user_Service.cambiarPassword(this.email,this.codigo,this.password).subscribe(
      response=>
      {
          if(response.status == 'ok')
          {
            this._router.navigate(['usuario/login']);
          }
          else
          {
            this.openSnackBar(response.message);
          }
      },
      error=>
      {
        this.openSnackBar(error.statusText);
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,undefined,{duration:3000});
  }
}
