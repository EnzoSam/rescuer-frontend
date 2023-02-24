import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { global } from '../../../services/global';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';
import { TipoAnimal } from 'src/app/models/tipoAnimal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Archivo } from 'src/app/models/archivo';
import { Atributo } from 'src/app/models/atributo';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-nueva-alerta',
  templateUrl: './nueva-alerta.component.html',
  styleUrls: ['./nueva-alerta.component.css']
})
export class NuevaAlertaComponent implements OnInit {

  tipoAlerta: number = 0;

  public page_title: string;
  public page_subTitle: string;
  public animal: any;
  public url;
  public esEdicion;
  public tiposAnimales: TipoAnimal[];
  public sexos: Atributo[];
  private atributosTipoAnimal: any[];
  public atributos: any[];
  public tamanios:any[];
  public paso=1;
  public sinNombre=false;
  public labelNombre = 'Nombre';

  imageSrc: string;
  imagenTemp: any;
  public urlUploadAnimales: string;
  public urlRecursosAnimales: string;


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });


  constructor(private _animalService: AnimalService, public generalService:GeneralService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar) {
    this.page_title = 'Nuevo Animalito';
    this.page_subTitle = "Ingrese los datos del animal";
    this.animal = _animalService.instanciarAnimal();
    this.url = global.url;
    this.esEdicion = false;
    this.tiposAnimales = [];
    this.sexos = []
    this.atributosTipoAnimal = [];
    this.atributos = [];
    this.tamanios = [];

    this.imageSrc = '';

    this.urlUploadAnimales = global.urlUploadAnimales;
    this.urlRecursosAnimales = global.urlRecursosAnimales;
  }
  ngOnInit() {

    this.CargarTiposAnimales();
  }


  get f() {
    return this.myForm.controls;
  }

  cargarAnimalEdicion() {
    
    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log('cargar animaaaaaaaaaaaaaaaal' + id);
      if (id && id != null && id != 0) {
        this.esEdicion = true;
        this._animalService.obtenerAnimal(id).subscribe(
          response => {
            if (response.status == 'ok') {
              this.animal = response.animal;

              this.tipoAlerta = this.animal.estado;
            }
            else {
              console.log('error' + response);
            }
          },
          error => {
            console.log('error' + <any>error);
          }
        )
      }
    })
  }

  onSubmit() {
    console.log(this.animal);



    if (this.esEdicion) {
      this.actualizar();
    }
    else {
      this.guardar();
    }
  }

  guardar() {
    this.animal.estado = this.tipoAlerta;
    this.animal.atributos = this.obtenerAtributosSeleccionados();
    this._animalService.insertar(this.animal).subscribe(
      response => {
        console.log(response);
        if (response.status == "ok") {
          this._router.navigate(['animal/detalle/', response.animal._id]);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  actualizar() {
    this.animal.atributos = this.obtenerAtributosSeleccionados();
    console.log('actualizar');
    console.log(this.animal);
    this._animalService.actualizar(this.animal).subscribe(
      response => {
        console.log(response);
        if (response.status == "ok") {
          this._router.navigate(['animal/detalle/', this.animal._id]);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  setImagenAnimal(datos: any) {

  }

  cargarAnimal(): void {

  }

  adopcion(): void {

    this.tipoAlerta = 1;
    this.paso = 3;
  }

  
  soloPublicaAlerta(): void {

    this.tipoAlerta = 1;
    this.sinNombre = true;
    this.paso = 3;
    this.page_title = 'Nueva alerta';
    this.labelNombre = 'Titulo';
  }

  extravio(): void {

    this.tipoAlerta = 2;
    this.paso = 3;
    this.page_title = 'Datos de tu mascota'
  }

  aceptarNombre()
  {
    if(this.sinNombre)
      this.animal.nombres = 'Animal';
    this.paso = 3;
  }
  

  CargarTiposAnimales() {
    this.generalService.obtenerTiposAnimales().subscribe(
      response => {
        if (response.status == "ok") {
          this.tiposAnimales = response.tiposAnimales;
          this.CargarSexosAnimales();
        }
      },
      error => {
        console.log(<any>error);
      } 
    );
  }

  CargarSexosAnimales() {
    this.generalService.obtenerAtributos("Sexo").subscribe(
      response => {
        if (response.status == "ok") {
          this.sexos = response.atributos;
          this.CargarTamanios();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onFileChange(event: any) {

    console.log(event);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });

        this._animalService.subirImagen(this.myForm.value).subscribe
          (
            response => {
              if (response.status == 'ok') {
                this.animal.imagen = response.imagen;
              }
            }
            , error => {
              this.openSnackBar("Errpr al subir imagen.");
            }

          )



      };

    }
  }

  submit1() {
    console.log(this.myForm.value);

    this._animalService.subirImagen(this.myForm.value).subscribe
      (
        response => {
          if (response.status == 'ok') {
            this.animal.imagen = response.imagen;
          }
        }
        , error => {
          this.openSnackBar("Errpr al subir imagen.");
        }

      )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 3000 });
  }

  imagenSubida(archivo: Archivo) {
    this.animal.imagen = archivo.url;
    console.log(archivo);
  }

  obtenerAtributos(tipoAnimal:any): any[] {
    var listReturn: any[] = [];

    if (tipoAnimal && tipoAnimal.atributos) {
      tipoAnimal.atributos.forEach((aa: { nombre: any; atributo: any; }) => {

        if(tipoAnimal.nombre == aa.nombre)
        {
          listReturn.push(aa.atributo);
        }

      });
    }

    return listReturn;
  }

  cambioTipoAnimal(tipo:any)
  {
    this.atributos = [];
    console.log(tipo);

    if(tipo)
    {
      this.atributos = this.obtenerAtributos(tipo);
    }
  }

  obtenerAtributosSeleccionados(): any[] {
    var listReturn: any[] = [];

    if (this.animal && this.atributos) {
      this.atributos.forEach(aa => {

        if(aa.seleccionado)
        {
          listReturn.push(aa);
        }

      });
    }

    return listReturn;
  }  

  CargarTamanios() {

    this.generalService.obtenerAtributos('Tamanio').subscribe(
      response => {
        if (response.status == "ok") {
          this.tamanios = response.atributos;

          this.cargarAnimalEdicion();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  compareObjects(o1: any, o2: any): boolean {
    return (!o1&& !o2) || (o1._id  && o2._id &&o1._id === o2._id);
  }  
}
