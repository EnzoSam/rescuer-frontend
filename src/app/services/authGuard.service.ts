import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../modules/usuario/services/usuario.service";
import { AuthService } from "./authService.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private usuarioService:AuthService, private router: Router)
    {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
        if(this.usuarioService.estaAutenticado())
        {
            if(route.url.toString().toLowerCase().indexOf('configuracion') != -1 && 
            this.usuarioService.getIdentity().rol != 'ROLE_SUPER')
            {
                alert('No autorizado');
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            this.router.navigate(['']);
            return false;
        }
    }

    
    
}