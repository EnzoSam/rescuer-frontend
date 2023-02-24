export class Contacto
{
    constructor
    (
        public _id: any,
        public referencia: string,
        public descripcion:string,
        public orden:number,
        public esPredeterminado:boolean,
        public tipoContacto:any
    )
    {

    }
}