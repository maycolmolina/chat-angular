import { Component, OnInit } from '@angular/core';
import { GlobalbaseService } from './service/globalbase.service';
import { MisusuariosService } from './service/misusuarios.service';
import { usuario } from './zzobject.model/usuario.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import  firebase from 'firebase/compat';
//https://proyecto-chat-e71cc.web.app

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string=""
  usuarios:usuario[];
  constructor(private global:GlobalbaseService,private misusarios : MisusuariosService,private cookie:CookieService, private rutas:Router){
  }
  ngOnInit(): void {
  }


}