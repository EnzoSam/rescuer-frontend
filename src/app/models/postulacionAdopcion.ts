import { Usuario } from "../modules/usuario/models/usuario";
import { Animal } from "./animal";

export class PostulacionAdopcion
{
    constructor
    (
        public _id: any,
        public comentario: string,
        public estado: Number,
        public fecha:Date,
        public animal?:Animal,
        public usuario?:Usuario
    )
    {

    }
}