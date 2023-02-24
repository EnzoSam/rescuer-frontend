export class Usuario
{
    constructor
    (
        public _id: any,
        public nombres: string,
        public apellidos: string,
        public apodo: string,
        public rol: string,
        public email: string,
        public password: string,
        public descripcion: string,
        public imagen: string,
        public lugar:any|undefined,
        public contactos:any[]
    )
    {

    }
}