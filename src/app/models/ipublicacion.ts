import { TipoPublicacion } from "../enums/publicacionEnums";

export interface IPublicacion {
    id:any|undefined;
    titulo: string;
    imagen:string;
    descripcion:string;
    tipo:TipoPublicacion;
    rutaDetalle:string;
    fecha:Date | undefined;
}