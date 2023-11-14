 export class usuario {
    nombre:string="";
    contrasenia:string="";
    correo:string="";
    apodo:string="";
    token:string="";
    urlImg="";
    constructor(nombre:string,contrasenia:string,correo:string,apodo:string){
        this.nombre=nombre;
        this.contrasenia=contrasenia;
        this.correo=correo;
        this.apodo=apodo;
        function generarNumeroAleatorio16Digitos(): string {
            let numeroAleatorio = '';
            for (let i = 0; i < 10; i++) {
                const digitoAleatorio = Math.floor(Math.random() * 10);
                numeroAleatorio += digitoAleatorio.toString();
            }
            return numeroAleatorio;
        }
        
    this.token= generarNumeroAleatorio16Digitos();
    }
}