import { Component, OnInit } from '@angular/core';
import { MisusuariosService } from '../service/misusuarios.service';
import { usuario } from '../zzobject.model/usuario.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persona:usuario= new usuario('','','','');
  direccionimg:string='url(5087579.png)';
  ngOnInit(): void {
    if(this.cookie.check('usuarioLogueado')){
      let miusuariologueado=JSON.parse(this.cookie.get('usuarioLogueado'));
      this.persona.apodo=miusuariologueado.apodo;
      this.persona.contrasenia=miusuariologueado.contrasenia;
      this.persona.token=miusuariologueado.token;
      this.persona.nombre=miusuariologueado.nombre;
      this.persona.correo=miusuariologueado.correo;
      this.persona.urlImg=miusuariologueado.urlImg;
      if(this.persona.urlImg!=''){
        this.direccionimg='url('+this.persona.urlImg+')';
      }
    }
  }
  constructor(private rutas:Router ,private misusuarios:MisusuariosService, private cookie : CookieService){
  }
  
  ir(p:string){
    this.rutas.navigate([p]);
  }
}
