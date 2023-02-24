import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService
{
    public identity:any;
    public token:string;

    constructor(public _http: HttpClient)
    {
        this.token = this.getToken();
    }

    estaAutenticado():boolean
    {
        return this.getToken() != '';
    }
    
    getToken():string
    {
        let token = localStorage.getItem('token');
        if(token && token != 'undefined')
        {
            this.token = token;        
        }
        else{
                this.token = '';
        }

        return this.token;
    }    

    getIdentity()
    {
        let o = localStorage.getItem('identity');
        if(o != null)
        {
            let identity = JSON.parse(o);
            if(identity && identity != 'undefined')
            {
                this.identity = identity;        
            }
            else{
                    this.identity = null;
            }
        }

        return this.identity;
    }    
}