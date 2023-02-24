import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';

@Component({
  selector: 'app-validar-cuenta',
  templateUrl: './validar-cuenta.component.html',
  styleUrls: ['./validar-cuenta.component.css']
})
export class ValidarCuentaComponent implements OnInit,OnDestroy {

  @Input() email:string;
  public codigo: string;
  public page_title: string;
  public page_subTitle: string;
  private subscription: Subscription;
  botonHabilitado= false;
  contador = 60;

  constructor(private _router: Router,
    private _route: ActivatedRoute, private usuarioService:UsuarioService) {

    this.page_title = 'Validar Cuenta';
    this.page_subTitle = 'Esta cuenta no ha sido validada aún';
    this.codigo = '';

      this.email =  '';
      this.subscription = interval(1000)
      .subscribe(x => { this.contar(); });
   }

  ngOnInit(): void {

    if(this._route.snapshot.params.email)
    {
      this.email =  this._route.snapshot.params.email;
    }

  }

  onSubmit()
  {
    
  }

  reenviarCodigo():void
  {
    this.contador = 50;
    this.botonHabilitado = false;
    this.usuarioService.reenviarCodigoActivacion(this.email, 0).subscribe(
      response=>
      {
        console.log(response);
      },
      error=>{
        console.log(error);
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  activavarDesactivarBoton()
  {
    
  }

  contar()
  {
    this.contador --;
    if(this.contador <= 0)
    {
      this.botonHabilitado = true;
      this.contador = 50;
    }
  }
}
