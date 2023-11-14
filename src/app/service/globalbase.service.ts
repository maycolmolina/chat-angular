import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { usuario } from '../zzobject.model/usuario.model';
import { publicacione } from '../zzobject.model/publicaciones.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalbaseService {
  
  constructor(private rutas : Router, private Httpservice:HttpClient , private cookie: CookieService){
    
  }
  obtenerusuarios(){
    return this.Httpservice.get('https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/usuarios.json');
  }
  botener_todas_p(){
    const url = 'https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/publicaciones.json';
    return this.Httpservice.get(url);
  }
  obtenerPublicaciones(){
    const url = 'https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/publicaciones.json';

    const queryParams = '?orderBy="$key"&limitToLast=15';

    return this.Httpservice.get(`${url}${queryParams}`);
  }

  // actualizarpublicaciones(publicaciones:publicacione[]){
  //   this.Httpservice.put('https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/publicaciones.json',publicaciones)
  //   .subscribe(
  //     (response)=>{
  //       console.log('datos almacenados correctamente',response);
  //     }
  //     ,
  //     (error)=>{
  //       console.log('vaya parece que ha ocirrido un error', error);
  //     }
  //   )
  // }
  insertar_publicaciones(publicacion:publicacione){
    this.Httpservice.post('https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/publicaciones.json',publicacion)
    .subscribe(
      (response)=>{
        console.log('datos almacenados correctamente',response);
      }
      ,
      (error)=>{
        console.log('vaya parece que ha ocirrido un error', error);
      }
    )
  }

  insertar_usuario(usuario:usuario){

    this.Httpservice.post('https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/usuarios.json',usuario)
    .subscribe(
      (response)=>{
        const usuarioLogueadojson={
          'nombre':usuario.nombre,
          'token':usuario.token,
          'apodo':usuario.apodo,
          'correo':usuario.correo,
          'contrasenia':usuario.contrasenia,
          'urlImg':usuario.urlImg
        };
        let strinusuario=JSON.stringify(usuarioLogueadojson);
        this.cookie.set('usuarioLogueado',strinusuario);
        this.cookie.set('indexusu',usuario.token);
        this.rutas.navigate(['perfil']);
      }
      ,
      (error)=>{
        alert('vaya parece que ha ocurrido un error al crear tu cuenta, no tienes buena conexion');
      }
    )
  }

  //  actualizarbase(usuarios:usuario[]){
  //   this.Httpservice.put('https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/usuarios.json',usuarios)
  //   .subscribe(
  //     (response)=>{
  //       console.log('datos almacenados correctamente',response);
  //     }
  //     ,
  //     (error)=>{
  //       console.log('vaya parece que ha ocirrido un error', error);
  //     }
  //   )
  //  }
}
