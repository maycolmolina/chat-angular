export class publicacione{

    texto:string;
    autor:string;
    date:Date;
    token:string;
    constructor(texto:string,autor:string,token:string){
        this.autor=autor;
        this.texto=texto;
        this.token=token;
        this.date=new Date();
    }
}