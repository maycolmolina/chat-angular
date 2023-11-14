import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, ref, query, orderByChild, equalTo, get, update } from 'firebase/database';
import { usuario } from '../zzobject.model/usuario.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modificar-contrasenia',
  templateUrl: './modificar-contrasenia.component.html',
  styleUrls: ['./modificar-contrasenia.component.css']
})
export class ModificarContraseniaComponent implements OnInit{

  contrseniaActual:string="";
  nuevaContrasenia:string="";
  confContrsenia:string="";
  cambiar=false;
  @ViewChild('cambiar') btncam: ElementRef

  

  constructor(private rutas:Router,private cookie:CookieService){}
  ngOnInit(): void {
  }

  ir(cadena:string){
    this.rutas.navigate([cadena]);
  }

  cambiar_estado(){
    this.cambiar=true;
  }

  cambiarCon(actual:string, nueva:string,conf:string){

    this.confContrsenia=conf;
    this.nuevaContrasenia=nueva;
    this.contrseniaActual=actual;

    let usuarioLogueado=JSON.parse(this.cookie.get('usuarioLogueado'));

    let usuario_modificado:usuario=usuarioLogueado;

    if(this.nuevaContrasenia!="" && this.confContrsenia!="" && this.contrseniaActual!=""){

      if(this.nuevaContrasenia==this.confContrsenia){

        if(this.contrseniaActual==usuarioLogueado.contrasenia){

          let excon=/^(?=.*[A-Z]).{8,}$/;

          if(!excon.test(this.nuevaContrasenia)){alert('la contrasenia debe de tener 8 caracteres como minimo y al menos una mayuscula'); return }
          usuario_modificado.contrasenia=this.confContrsenia;
          this.btncam.nativeElement.disabled=true;
          const realtime=getDatabase();//obteniendo la bases de datos de realtime databese de fire base
          const tokenToModify =this.cookie.get('indexusu');//obtengo el token de usuario que deseo modificar en seste caso el mismo que esta logueado
          const ref_usuarios=ref(realtime,'usuarios')
          
          
//,-------------------------------------------------------------------------------------------------------

          // Buscar el nodo con el token especificado
          const consulta = query(ref_usuarios, orderByChild('token'), equalTo(tokenToModify));

          get(consulta).then(snapshot => {
            if (snapshot.exists()) {
              // El nodo con el token especificado existe, lo modificamos

              const userKey = Object.keys(snapshot.val())[0]; // Obtener la clave del usuario
              const userToUpdateRef = ref(realtime, `usuarios/${userKey}`);
          
              // Modificar el nodo con los nuevos datos



              update(userToUpdateRef, usuario_modificado)
                .then(() => {
                  usuarioLogueado.contrasenia=usuario_modificado.contrasenia;
                  let usunue=JSON.stringify(usuarioLogueado);
                  this.cookie.set('usuarioLogueado',usunue);
                  alert('la contraseña a sido cambiada con exito');
                  this.rutas.navigate(['ajustes']);
                })
                .catch(error => {
                  alert('por alguna razon no pudimos cambair tu contraseña intenta de nuevo');
                  this.btncam.nativeElement.disabled=false;
                });
            } else {
              console.log('No se encontró ningún registro con el token especificado');
            }
          })
          .catch(error => {
            alert('Error al buscar el registro');
          });

//,-------------------------------------------------------------------------------------------------------




        }else{
          alert ('la contraseña que ingresaste es incorrecta');
        }
      }else{

        alert("las contrasenias no coinciden");

      }

    }else{
      alert ("todos los campos deben de estae llenos");
    }
    
  }
}
