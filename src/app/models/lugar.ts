export class Lugar
{
    constructor
    (
        public _id: any,
        public nombre: string,
        public lugarPadre:any,
        public tipo:any|null,
        public lugares:Lugar[]
    )
    {

    }
}