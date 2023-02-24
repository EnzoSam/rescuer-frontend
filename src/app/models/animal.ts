import { Atributo } from "./atributo";
import { TipoAnimal } from "./tipoAnimal";

export class Animal
{
    constructor
    (
        public _id: any,
        public nombres: string,
        public apellidos: string,
        public apodo: string,
        public descripcion: string,
        public imagen: string,    
        public atributos: Atributo[],
        public requierePostulacion:Boolean,
        public usuario?:any,
        public estado?:number,
        public tipoAnimal?:TipoAnimal,
        public sexo?:Atributo,
        public castrado?:Boolean,
        public tamanio?:Atributo,
    )
    {

    }

    public toString = () : string => {
        return this.nombres;
    }
}