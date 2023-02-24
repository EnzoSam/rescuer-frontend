import { Atributo } from "./atributo";
import { TipoAnimal } from "./tipoAnimal";

export class FiltroAnimal
{
    constructor
    (
        public tipos: TipoAnimal[],
        public tamanios: Atributo[],
        public sexos: Atributo[],
        public estado:Number,
        public pagina:number | undefined,
        public itemsPagina:number | undefined,
        public lugar:any|undefined
    )
    {
        tipos = [];
        tamanios = [];
        sexos = [];
        estado = 1;
    }
}