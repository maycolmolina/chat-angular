import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MisusuariosService } from '../service/misusuarios.service';
import { usuario } from '../zzobject.model/usuario.model';
import { GlobalbaseService } from '../service/globalbase.service';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent {
  
  constructor(private global:GlobalbaseService,private misusuarios:MisusuariosService){}
  

  agregarusu(formulario:NgForm){
    const correo=formulario.value.correo
    const contrasenia=formulario.value.contrasenia
    const apodo=formulario.value.apodo
    const nombre=formulario.value.nombre

    let emailexpresion=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let contrseniaexpresion=/^(?=.*[A-Z]).{8,}$/;

    let np = /^[A-Za-z0-9\s]{4,}$/;

    let apodoex=/^(?=(?:\S\s*|\S{0,2}){3})[^\n]*$/;




    // validaciones, si no cumple con las condiciones dadas no pasara a crear el usuario
    if(correo!=''&& contrasenia!=''&& apodo!=''&& nombre!=''){}else {alert ('todos los campos deben de ser obligatorios')
    return;}
    if(!np.test(nombre)){alert('el nombre debe tener como minimo 4 caracteres'); return }
    if(!emailexpresion.test(correo)){alert('correo incorrecto ,use una direccion de correo valido'); return }
    if(!contrseniaexpresion.test(contrasenia)){alert('la contrasenia debe de tener 8 caracteres como minimo y al menos una mayuscula'); return }
    if(!apodoex.test(apodo)){alert('el apodo debe de tener al menos 3 caracteres'); return }

    this.global.obtenerusuarios()
      .subscribe(
          misusuarios=>{
            this.misusuarios.listadeusuarios=Object.values(misusuarios).map(
              (usuarioo)=>{
                const usua=new usuario('','','','');
                Object.assign(usua,usuarioo)
                return usua;
              }
            )
            this.insertarUsuario(formulario)
          },
          error=>{
            alert('no tienes una conexion buena')
          }
    )
  }


  insertarUsuario(formulario:NgForm) {

    const correo=formulario.value.correo
    const contrasenia=formulario.value.contrasenia
    const apodo=formulario.value.apodo
    const nombre=formulario.value.nombre
    
    let existeToken;

    let usuariob:usuario;
    
    do{
        usuariob=new usuario(nombre,contrasenia,correo,apodo);
        existeToken=this.misusuarios.comprobarToken(usuariob);
    }while(existeToken==true);

    this.misusuarios.agregarusuarionuevo(usuariob)
  }
  
}
