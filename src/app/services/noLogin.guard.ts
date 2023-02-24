import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { UsuarioService } from '../modules/usuario/services/usuario.service';
import { AuthService } from './authService.service';

@Injectable()
export class NoLoginGuard implements CanActivate
{
    
    constructor(private _router: Router,
        private _authService:AuthService)
    {

    }

    canActivate()
    {
        let identity = this._authService.getIdentity();
        if(identity)
        {
            return true;           
        }
        else{        
            this._router.navigate(['/usuario/login']);
            return false;
        }
    }
}