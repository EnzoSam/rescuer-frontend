import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { UsuarioService } from '../modules/usuario/services/usuario.service';
import { AuthService } from './authService.service';

@Injectable()
export class LoginGuard implements CanActivate
{
    
    constructor(private _router: Router,
        private _usuarioService:AuthService)
    {

    }

    canActivate()
    { 
        let identity = this._usuarioService.getIdentity();
        if(identity)
        {
            this._router.navigate(['']);
            return false;
            
        }
        else{
            return true;
        }
    }
}