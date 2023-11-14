import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MisusuariosService } from '../service/misusuarios.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalbaseService } from '../service/globalbase.service';
import { usuario } from '../zzobject.model/usuario.model';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.css']
})


export class LogueoComponent  implements OnInit{

  constructor(private global:GlobalbaseService, private cookie:CookieService, private misuarios:MisusuariosService,private router:Router){}
  ngOnInit(): void {
    if(this.cookie.check('indexusu')){
      this.router.navigate(['salir'])
    }
  }

  entrar(formulario:NgForm){

    let emailexpresion=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let usuariotext=formulario.value.usuario;
    let contrasenia=formulario.value.contrasena;


    if(contrasenia=="" || usuariotext=="")/*le estamos diciendo que el campo usuario y el cmpo contrasenia deben de ser obligatorios*/
    {
      alert('todos los campos son obligatorios' )
      return;
    }

    if(emailexpresion.test(formulario.value.usuario)){
      
      this.global.obtenerusuarios()
      .subscribe(
          misusuarios=>{
            this.misuarios.listadeusuarios=Object.values(misusuarios).map(
              (usuarioo)=>{
                const usua=new usuario('','','','');
                Object.assign(usua,usuarioo)
                return usua;
              }
            )
            this.misuarios.coprobarusuario(usuariotext,contrasenia)
          },
          error=>{
            alert('no tienes una conexion buena')
          }
        )
    }else{
      alert('formato de cooreo no es valido');
    }
  }
  ir(cadena:string){
    this.router.navigate([cadena])
  }
}
