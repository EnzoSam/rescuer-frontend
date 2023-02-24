import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Injectable()
export class GeneralService
{
    public url:string;
    public pais:any;
    public provincia:any;
    public ciudad:any;

    constructor(public _http: HttpClient)
    {
        this.url = global.url;
    }

    test()
    {
        return 'Test general service';
    }

    registrar(user:any):Observable<any>
    {
        let json = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-Type','application/json');

        let p =this._http.post(this.url+'usuario/registrar',json,{headers:headers});        
        return p;
    }


    update(token:string, user:any): Observable<any>
    {
        user.description = global.htmlEntities(user.description);
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.put(this.url+'usuario/update', params,{headers:headers});
    }

    getPais()
    {
        return this.pais;
    }

    getUser(id:number, token:any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'usuario/detalle/' + id, {headers:headers});
    }

    obtenerAtributos(agrupador:string):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        if(agrupador && agrupador != '' && agrupador != undefined)
        {
            return this._http.get(this.url+'general/atributos/' + agrupador, {headers:headers});        
        }
        else
        {
            return this._http.get(this.url+'general/atributos', {headers:headers});       
        }
    }   
    

    nuevoAtributo(atributo:any): Observable<any>
    {
        let json = JSON.stringify(atributo);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/atributo/nuevo', json,{headers:headers});
    }    

    actualizarAtributo(atributo:any): Observable<any>
    {
        let json = JSON.stringify(atributo);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'general/atributo/actualizar', json,{headers:headers});
    }      

    obtenerTiposAnimales():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'general/tipos-animales', {headers:headers}); 
    }  

    nuevoTipoAnimal(tipoAnimal:any): Observable<any>
    {
        let json = JSON.stringify(tipoAnimal);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/tipo-animal/nuevo', json,{headers:headers});
    }     

    actualizarTipoAnimal(tipoAnimal:any): Observable<any>
    {
        let json = JSON.stringify(tipoAnimal);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'general/tipo-animal/actualizar', json,{headers:headers});
    }  

    obtenerSexos():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'general/sexos', {headers:headers}); 
    }     

    obtenerTiposContactos():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'general/tiposContactos', {headers:headers}); 
    } 
    
    nuevoTipoContacto(tipoContacto:any): Observable<any>
    {
        let json = JSON.stringify(tipoContacto);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/tipo-contacto/nuevo', json,{headers:headers});
    }    
    
    nuevoSexo(sexo:any): Observable<any>
    {
        let json = JSON.stringify(sexo);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/sexos/nuevo', json,{headers:headers});
    }     

    eliminarSexo(id:any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'general/sexos/' + id,{headers:headers});
    } 

    nuevoLugar(lugar:any): Observable<any>
    {
        let json = JSON.stringify(lugar);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/lugar/nuevo', json,{headers:headers});
    }    

    actualizarLugar(lugar:any): Observable<any>
    {
        let json = JSON.stringify(lugar);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'general/lugar/actualizar', json,{headers:headers});
    }  

    obtenerLugares(idPadre:any):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'general/lugares/' + idPadre, {headers:headers}); 
    }       
    
    obteneresLugaresPaisActual():Observable<any>
    {
        console.log('lugar actual:');
        console.log(this.pais);
        if(this.pais)
        {
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.get(this.url+'general/lugares/' + this.pais._id, {headers:headers}); 
        }
        else
        {
            return new Observable();
        }
    } 

    eliminarLugar(id:any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'general/lugar/' + id,{headers:headers});
    }     

    nuevoTipoLugar(tipoLugar:any): Observable<any>
    {
        let json = JSON.stringify(tipoLugar);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/tipo-lugar/nuevo', json,{headers:headers});
    }    

    obtenerTiposLugares():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'general/tipos-lugares', {headers:headers}); 
    }       
    

    eliminarTipoLugar(id:any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'general/tipo-lugar/' + id,{headers:headers});
    }    

    nuevoSlider(slider:any): Observable<any>
    {
        let json = JSON.stringify(slider);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/slider/nuevo', json,{headers:headers});
    }    

    obtenerSliders(tipo:any|undefined):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        if(tipo)
            return this._http.get(this.url+'general/sliders/' + tipo, {headers:headers}); 
        else
            return this._http.get(this.url+'general/sliders/0', {headers:headers}); 
    }       
    

    eliminarSlider(id:any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'general/slider/' + id,{headers:headers});
    }    

    obtenerProvinciasServicioNacional():Observable<any>
    {
        return this._http.get("https://apis.datos.gob.ar/georef/api/provincias?aplanar=true&campos=basico&max=100"); 
    } 


    obtenerMunicipiosServicioNacional():Observable<any>
    {
        return this._http.get("https://apis.datos.gob.ar/georef/api/municipios?aplanar=true&campos=estandar&max=5000"); 
    }    

    obtenerPaisIP():Observable<any>
    {
        return this._http.get("http://ip-api.com/json");
    }

    cargarPais()
    {
        if(this.pais)
            return;
        this.obtenerPaisIP().subscribe(
            response=>
            {
                if(response.status === 'success')
                {
                    this.obtenerLugar(response.country).subscribe(
                        response=>{
                            if(response.lugar && response.lugar.length > 0)
                            {
                                this.pais = response.lugar[0];
                                console.log(this.pais);
                            }
                        },
                        error=>
                        {
                            console.log(error);
                        }                                            
                    );
                }
            },
            error=>
            {
                console.log(error);
            }
        );
    }

    obtenerLugar(nombre:string):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'general/lugar/' + nombre, {headers:headers}); 
    }   
    
    obtenerDatosUtiles(estado:Number|null):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        if(estado != null)
            return this._http.get(this.url+'general/datos-utiles/' + estado, {headers:headers}); 
        else
            return this._http.get(this.url+'general/datos-utiles/-1', {headers:headers}); 
    }  

    nuevoDatoUtil(dato:any): Observable<any>
    {
        let json = JSON.stringify(dato);
        
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'general/dato-util/nuevo', json,{headers:headers});
    } 
    
    eliminarDatoUtil(id:any): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'general/dato-util/' + id,{headers:headers});
    }  
    
    eliminarTodosLosLugares(): Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'general/lugar',{headers:headers});
    }      
}