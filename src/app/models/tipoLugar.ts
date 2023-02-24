export class TipoLugar
{
    constructor
    (
        public _id: any,
        public nombre: string,
        public referencia:string,
        public tipo:any|null,
        public tipoHijo:any|null,
        public orden:number
    )
    {

    }
}