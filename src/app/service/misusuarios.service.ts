import { Injectable } from '@angular/core';
import{usuario} from '../zzobject.model/usuario.model'
import { Router } from '@angular/router';
import { GlobalbaseService } from './globalbase.service';
import { CookieService } from 'ngx-cookie-service';
import { equalTo, get, getDatabase, orderByChild, query, ref, update } from 'firebase/database';
@Injectable({
  providedIn: 'root'
})
export class MisusuariosService {

  listadeusuarios:usuario[]=[];

  constructor(private rutas:Router,private datos:GlobalbaseService,private cookie : CookieService) { }


  coprobarusuario(usuarioo:string,contrasenia:string){
    //aca es donde voy a cargar los usuarios por primera ves
    let encontrado=0;
    for(let i=0;i<this.listadeusuarios.length;i++){
      if(contrasenia==this.listadeusuarios[i].contrasenia && usuarioo==this.listadeusuarios[i].correo)
      {
        this.cookie.set('indexusu',this.listadeusuarios[i].token);

        const usuarioLogueadojson={
          'nombre':this.listadeusuarios[i].nombre,
          'token':this.listadeusuarios[i].token,
          'apodo':this.listadeusuarios[i].apodo,
          'correo':this.listadeusuarios[i].correo,
          'contrasenia':this.listadeusuarios[i].contrasenia,
          'urlImg':this.listadeusuarios[i].urlImg
        };

        let usuarioLogueado=JSON.stringify(usuarioLogueadojson);
        this.cookie.set('usuarioLogueado',usuarioLogueado)

        this.rutas.navigate(['perfil'])
        encontrado=1
      }
    }
    if(encontrado==0){
      alert ('usuario no encontrado');
    }
    
  }
  async agregarusuarionuevo(usuarionuevo:usuario){
    if(this.comprobarcorreo(usuarionuevo)==true ){
      alert('correo ya no esta disponible');
    }else{
      this.datos.insertar_usuario(usuarionuevo);
    }
  }
  comprobarcorreo(usuarionuevo:usuario){
    return this.listadeusuarios.some(usuarioo=>usuarionuevo.correo==usuarioo.correo);
  }



  comprobarToken(usuarionuevo:usuario){
    return this.listadeusuarios.some(_usu => usuarionuevo.token === _usu.token);
  }


  getUsuarioVisitar(idavisitar:string){
    const realtime =getDatabase();
    const referencia=ref(realtime,'usuarios')
    const consulta=query(referencia,orderByChild('token'),equalTo(idavisitar));

     return get(consulta);
  }

}
