import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { usuario } from '../zzobject.model/usuario.model';
import { equalTo, get, getDatabase, orderByChild, query, ref, update } from 'firebase/database';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-usuario-m',
  templateUrl: './mi-usuario-m.component.html',
  styleUrls: ['./mi-usuario-m.component.css']
})
export class MiUsuarioMComponent implements OnInit{
  nombreusuario="";
  apodousuario="";
  emailusuario="";
  contrasenia="";
  yo:usuario;
  @ViewChild('btnupdate') btnm:ElementRef;
  constructor(private cookie:CookieService,private rutas:Router){}

  ngOnInit(): void {
    let miusuariologiin=JSON.parse(this.cookie.get('usuarioLogueado'));
    this.yo=miusuariologiin;
    this.nombreusuario=this.yo.nombre;
    this.apodousuario=this.yo.apodo;
    this.emailusuario=this.yo.correo;
  }

  cambiar(){

    let emailexpresion=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let np = /^[A-Za-z0-9\s]{4,}$/;
    let apodoex=/^(?=(?:\S\s*|\S{0,2}){3})[^\n]*$/;

    if(this.nombreusuario!="" && this.emailusuario!=""  && this.contrasenia!="" && this.apodousuario!=""){

      if(!np.test(this.nombreusuario)){alert('el nombre debe tener como minimo 4 caracteres'); return }
      if(!emailexpresion.test(this.emailusuario)){alert('correo incorrecto ,use una direccion de correo valido'); return }
      if(!apodoex.test(this.apodousuario)){alert('el apodo debe de tener al menos 3 caracteres'); return }

      if(this.contrasenia==this.yo.contrasenia){

        if(this.nombreusuario!=this.yo.nombre || this.emailusuario!=this.yo.correo  || this.apodousuario!=this.yo.apodo){

          let miusuariologiin=JSON.parse(this.cookie.get('usuarioLogueado'));
          let usuario_modificado:usuario=miusuariologiin;
          // ____________________________________________________________________________________________________
          usuario_modificado.apodo=this.apodousuario;
          usuario_modificado.correo=this.emailusuario;
          usuario_modificado.nombre=this.nombreusuario;
          this.btnm.nativeElement.disabled=true;
          const realtime=getDatabase();
          const tokenToModify=miusuariologiin.token;
          const referenciaUsuarios=ref(realtime,'usuarios')

          // Buscar el nodo con el token especificado
          const consulta = query(referenciaUsuarios,orderByChild('token'),equalTo(tokenToModify));
          // significado=buscar un usuario que su campo token sea igual a tokenToModify
          get(consulta).then(objetoCom=>{

            if(objetoCom.exists()){
              // obtenemos la clave del noso que cumple con la consuta utilizando ua funcion de la clase objec
              const llavedelnodo=Object.keys(objetoCom.val())[0];
              // obtenemos una referencia al nodo con la clave que anterior mente obtuvimos
              const ref_nodo_toModify=ref(realtime,`usuarios/${llavedelnodo}`);

              update(ref_nodo_toModify,usuario_modificado)
                .then(p=>{
                  let strmodi=JSON.stringify(usuario_modificado);
                  this.cookie.set('usuarioLogueado',strmodi);
                  alert('usuario modificado');
                  this.rutas.navigate(['perfil']);
                })
                .catch(p=>{alert('el usuario no ha sido modificado'+p) ;this.btnm.nativeElement.disabled=false;})
            }else{
              alert('ha ocurrido un error al intentar conectar con tu usuario vuleve a intentarlo')
            }
          }).catch(
            error => {
              alert('Error al buscar el registro'+error);
              this.btnm.nativeElement.disabled=false;
            }
          )
          // _____________________________________________________________________________________________________________--
          
        }else{
          alert(" no has realizado ningun cambio");
        }

      }else{
        alert('ingrese la contrasenia correcta');
      }

    }else{
      alert('todos los campos son obligatorios');
    }
  }

}
