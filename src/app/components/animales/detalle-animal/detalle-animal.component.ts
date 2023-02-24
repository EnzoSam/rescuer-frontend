import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';
import { global } from '../../../services/global';
import {MatDialog} from '@angular/material/dialog';
import { PostulacionComponent } from '../postulacion/postulacion.component';
import { DetallePostualacionComponent } from '../detalle-postualacion/detalle-postualacion.component';
import { AuthService } from 'src/app/services/authService.service';

@Component({
  selector: 'app-detalle-animal',
  templateUrl: './detalle-animal.component.html',
  styleUrls: ['./detalle-animal.component.css']
})
export class DetalleAnimalComponent implements OnInit {

  title = 'Detalle animal';
  idAnimal:string;
  public animal:Animal;
  public urlRecursos:string;
  public mostrarContacto:boolean;
  public postulaciones:any[];
  public postulacionUsuario:any;

  constructor(private _animalService:AnimalService,
              private _authService:AuthService,
              private _router: Router,
              private _route: ActivatedRoute,
              private dialog: MatDialog)
  {    
    this.idAnimal = '';
    this.animal = _animalService.instanciarAnimal();
    this.urlRecursos = global.urlRecursosAnimales;    
    this.mostrarContacto = false;
    this.postulaciones = [];
  }
 

  confirmarAdopcion()
  {
    /*
    this._animalService.aniamalAdoptado(this.animal.id, this.token).subscribe(
      response=>
      {
          if(response.status == 'success')
          {
              this.status = "Actualizacion exitosa";
              console.log("Animal fue actualizado");
              this.modalService.dismissAll(ModalDismissReasons.ESC);
              this.reloadComponent();
          }
          else{
            this.status = "Error en la actualizacion";
            console.log('error' + response);
          }
      },
      error=>{
        console.log('error' +  <any>error);
      }
    )    */         
  }

  confirmarEncontrado()
  {
    /*
    this._animalService.aniamalEncontrado(this.animal.id, this.token).subscribe(
      response=>
      {
          if(response.status == 'success')
          {
              this.status = "Actualizacion exitosa";
              console.log("Animal fue actualizado");
              this.modalService.dismissAll(ModalDismissReasons.ESC);
              this.reloadComponent();
          }
          else{
            this.status = "Error en la actualizacion";
            console.log('error' + response);
          }
      },
      error=>{
        console.log('error' +  <any>error);
      }
    )      
    */       
  }  

  reloadComponent() {
    let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([currentUrl]);
    }

  ngOnInit() {
    this.cargarAnimal();
  }

  cargarAnimal()
  {
    this._route.params.subscribe(params=>{
      this.idAnimal = params['id'];
      console.log(this.idAnimal);
      if(this.idAnimal)
      {
        this._animalService.obtenerAnimal(this.idAnimal).subscribe(
          response=>
          {
              if(response.status == 'ok')
              {
                  this.animal = response.animal;
                  console.log(this.animal);
                  this.cargarPostulaciones();
              }
              else{
                console.log('error' + response);
              }
          },
          error=>{
            console.log('error' +  <any>error);
          }
        )           
      }
    })
  }


  eliminar()
  {
    this._animalService.eliminar(this.idAnimal).subscribe(
      response=>{
        if(response.status == "ok")
        {
          this._router.navigate(['']);
        }
        else{
        }        
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    ); 
  }


  contactar()
  {
    this.mostrarContacto = true;
  }

  postularme()
  {
      const dialogRef =this.dialog.open(PostulacionComponent, {
        data: {
          animal: this.animal
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    
  }

  
  verPostulacion()
  {
      const dialogRef =this.dialog.open(DetallePostualacionComponent, {
        data: {
          postulacion: this.postulacionUsuario
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    
  }

  cargarPostulaciones()
  {

      if(this.idAnimal)
      {
        this._animalService.obtenerPostulaciones(this.idAnimal).subscribe(
          response=>
          {
              if(response.status == 'ok')
              {
                  this.postulaciones = response.postulaciones;
                  console.log(this.postulaciones);
                  for(let p of this.postulaciones)
                  {
                    if(p.usuario == this._authService.getIdentity()._id)
                    {
                      this.postulacionUsuario = p;
                      break;
                    }
                  }
              }
              else{
                console.log('error' + response);
              }
          },
          error=>{
            console.log('error' +  <any>error);
          }
        )           
      }    
  }  

    getIdentity()
    {
      return this._authService.getIdentity();
    }
}
