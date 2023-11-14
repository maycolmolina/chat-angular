import { Injectable } from '@angular/core';
import { equalTo, get, getDatabase, orderByChild, query, ref, update } from 'firebase/database';
import { CookieService } from 'ngx-cookie-service';
import { usuario } from '../zzobject.model/usuario.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ModiusuarioService {

  constructor(private cookie:CookieService) {

  }
  actualizarusua(urlnueva:string){
    let usuarioLogueado=JSON.parse(this.cookie.get('usuarioLogueado'));
    let usuario_modificado:usuario=usuarioLogueado;
    usuario_modificado.urlImg=urlnueva;

    const realtime=getDatabase();//obteniendo la bases de datos de realtime databese de fire base
    const tokenToModify =this.cookie.get('indexusu');//obtengo el token de usuario que deseo modificar en seste caso el mismo que esta logueado
    const ref_usuarios=ref(realtime,'usuarios')
//,-------------------------------------------------------------------------------------------------------

    // Buscar el nodo con el token especificado
    const consulta = query(ref_usuarios, orderByChild('token'), equalTo(tokenToModify));

    return get(consulta).then(snapshot => {
      if (snapshot.exists()) {
        // El nodo con el token especificado existe, lo modificamos
        const userKey = Object.keys(snapshot.val())[0]; // Obtener la clave del usuario
        const userToUpdateRef = ref(realtime, `usuarios/${userKey}`);
        
        // Modificar el nodo con los nuevos datos
              update(userToUpdateRef, usuario_modificado)
                .then(() => {
                  usuarioLogueado.urlImg=usuario_modificado.urlImg;
                  let usunue=JSON.stringify(usuarioLogueado);
                  this.cookie.set('usuarioLogueado',usunue);
                  alert('haas cambiado tu foto de perfil');
                  
                })
                .catch(error => {
                  alert('a ocurrido un error');
                });
      } else {
        console.log('No se encontró ningún registro con el token especificado');
      }
    })
    .catch(error => {
      alert('Error al buscar el registro');
    });

  }
}
