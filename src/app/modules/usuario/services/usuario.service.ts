import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from '../../../services/global';
import { AuthService } from 'src/app/services/authService.service';

@Injectable()
export class UsuarioService
{
    public url:string;

    constructor(private _http: HttpClient, private _authService: AuthService)
    {
        this.url = global.url;
    }

    test()
    {
        return 'Test user service';
    }

    registrar(user:any):Observable<any>
    {
        let json = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-Type','application/json');

        let p =this._http.post(this.url+'usuario/registrar',json,{headers:headers});        
        return p;
    }

    iniciarSesion(user:any, gettoken:boolean):Observable<any>
    {
        if(gettoken)
        {
            user.getToken = true;
        }
        else
        {
            user.getToken = false;
        }

        let json = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'usuario/login',json,{headers:headers});    
    }

    update( user:any): Observable<any>
    {
        user.description = global.htmlEntities(user.description);
        
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this._authService.getToken());
        return this._http.put(this.url+'usuario/actualizar', user,{headers:headers});
    }

    getUser(id:any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', this._authService.getToken());
        return this._http.get(this.url+'usuario/' + id, {headers:headers});
    }

    listar(token:string, idUsuario:number):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        let a =this._http.post(this.url+'animal/listar/' + idUsuario, {headers:headers});        
        return a;
    }    

    reenviarCodigoActivacion(email:string, motivo:number): Observable<any>
    {
        let json = JSON.stringify({email:email, motivo:motivo});
        
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.put(this.url+'usuario/reenviar-codigo', json,{headers:headers});
    }

    validarCodigoRegistro(email:string, codigo:string): Observable<any>
    {
        let json = JSON.stringify({e:email, c:codigo});
        
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.put(this.url+'usuario/validarcodigo', json,{headers:headers});
    }

    cambiarPassword(email:string, codigo:string, password:string): Observable<any>
    {
        let json = JSON.stringify({email:email, codigo:codigo, password:password});
        
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.put(this.url+'usuario/cambiar-password', json,{headers:headers});
    }

    getIdentity()
    {
        return this._authService.getIdentity();
    }

    obtenerPostulaciones(idUsuario:any):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this._authService.getToken());

        let a =this._http.get(this.url+'usuario/postulaciones/' + idUsuario, {headers:headers});        
        return a;
    }    
}