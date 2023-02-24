import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';

@Component({
  selector: 'app-subir-archivo-conf',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.css']
})
export class SubirArchivoConfComponent implements OnInit {

  @Input() urlBase:string;
  @Output() archivoSubido = new EventEmitter<Archivo>();
  
  urlImagenSubida:string;

  imageForm:FormGroup;
  image:any;
  file:any;

  constructor(private uploadService: SubirArchivoService,
    private router:Router,
    private _snackBar: MatSnackBar) 
  { 
    this.urlBase = '';
    this.urlImagenSubida = '';
    this.imageForm=new FormGroup({
      name: new FormControl(null,Validators.required),
      file:new FormControl(null, Validators.required)
  });    
  }

  ngOnInit(): void {

  }  

  onFileChange(event:any){
    if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];
        if(file.type.includes("image")){//Evaluar si es una imagen
            const reader= new FileReader();
            reader.readAsDataURL(file);
            reader.onload=function load(this: any){
                this.image=reader.result; //Asignar al thumbnail
                this.uploadService.addPicture('file01',file,this.urlBase)
                .subscribe(
                    (data:any)=>{

                      this.urlImagenSubida = data.file.filename;
                      this.archivoSubido.emit(new Archivo(this.urlImagenSubida));
                    },
                  (err: any)=>
                    {
                      console.log;
                    }
                )                
            }.bind(this);
            this.file=file;
        }else{
            this._snackBar.open('Error al subir imagen');
        }
    }
}

}
