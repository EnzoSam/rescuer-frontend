import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import{TipoAnimal} from '../models/tipoAnimal';
import {global} from './global';
import { FiltroAnimal } from '../models/filtroAnimal';
import { Animal } from '../models/animal';
import { PostulacionAdopcion } from '../models/postulacionAdopcion';
import { AuthService } from './authService.service';

@Injectable()
export class AnimalService
{
    public url:string;
    private tiposAnimales:TipoAnimal[]

    constructor(private _http: HttpClient,
        public authService:AuthService)
    {
        this.url = global.url;
        this.tiposAnimales =[];
    }

    test()
    {
        return 'Test animal service';
    }

    obtenerAnimales(filtro:FiltroAnimal):Observable<any>
    {
        let json = JSON.stringify(filtro);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'animal/listar', json,{headers:headers});
    }     

    obtenerAnimal(id:string):Observable<any>
    {
        console.log('ida serviceeeeeeeeeeeee' + id);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());
        return this._http.get(this.url+'animal/' + id, {headers:headers}); 
    } 

    insertar(animal:Animal):Observable<any>
    {
        let json = JSON.stringify(animal);

        console.log('animal serviceeeeeeeeeeeeeeeee');
        console.log(json);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());
        let p =this._http.post(this.url+'animal/insertar',json,{headers:headers});        
        return p;
    }


    actualizar(animal:Animal):Observable<any>
    {
        let json = JSON.stringify(animal);

        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());

        let p =this._http.put(this.url+'animal/actualizar',json,{headers:headers});        
        return p;
    }
    
    eliminar(id:string):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());

        let p =this._http.delete(this.url+'animal/' + id,{headers:headers});        
        return p;
    }

    subirImagen(imagen:any):Observable<any>
    {
        console.log(imagen);
        const formData = new FormData();

        formData.append("files", imagen);

        let headers = new HttpHeaders().set('Content-Type','application/form-data')
                                        .set('Authorization', this.authService.getToken());

        let p =this._http.post(this.url+'animal/subir-imagen',imagen,{headers:headers});        
        return p;
    }  
    
    obtenerUrlImagen(archivo:string):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());
        return this._http.get(this.url+'animal/imagen/' + archivo, {headers:headers}); 
    }    

    instanciarAnimal():Animal
    {
        return new Animal(0,'','','','','',[],false,undefined,0,undefined,undefined, undefined);
    }


    obtenerAtributosAnimales():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());
        return this._http.get(this.url+'animal/atributos', {headers:headers}); 
    }   
    
    insertarPostulacionAdopcion(postulacion:PostulacionAdopcion):Observable<any>
    {
        let json = JSON.stringify(postulacion);

        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());
        let p =this._http.post(this.url+'animal/postulacion-adopcion/nueva',json,{headers:headers});        
        return p;
    }    

    obtenerPostulaciones(idAnimal:any):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());
        return this._http.get(this.url+'animal/postulaciones/' + idAnimal, {headers:headers}); 
    }     

    detallePostulacion(id:string):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('Authorization', this.authService.getToken());
        return this._http.get(this.url+'animal/postualcion/' + id, {headers:headers}); 
    } 

    obtenerPublicaciones(filtro:FiltroAnimal):Observable<any>
    {
        let json = JSON.stringify(filtro);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'animal/publicaciones', json,{headers:headers});
    }       
} 