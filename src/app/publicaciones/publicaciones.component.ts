import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicacionesService } from '../service/publicaciones.service';
import { publicacione } from '../zzobject.model/publicaciones.model';
// import { MisusuariosService } from '../service/misusuarios.service';
import { GlobalbaseService } from '../service/globalbase.service';
import { CookieService } from 'ngx-cookie-service';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent  implements OnInit{
  @ViewChild('bajara') contenedor: ElementRef
  cja:string="";
  publicacionesm:publicacione[]=[];
  mitoken:string;
  cargando=true;
  p=0;
  usuariologueado:any;

  constructor(private ruta:Router, private cookie:CookieService, private laspublicaciones: PublicacionesService,private global:GlobalbaseService){}

  ecuchar(){
    const database = getDatabase();//referencia mi base de datos realtime de mi proyecto de firebase
    const refenc_publicaciones = ref(database, 'publicaciones');  // referencia al nodo de realtime database que deseo escuchar
    onValue(refenc_publicaciones, (/* aca podemos pedir como parametro el cambio o publicaciones actualizadas*/) => {//la funcion onvalue escucha los cambios del nodo al cual cree una referencia
      this.obtener(); 
    });
  }

  verperfil(e:any){
    let p=e.target.id;
    this.ruta.navigate(['visitarPerfil',p])
  }
  
  
  obtener(){//obtiene los ultimos 15 sms

    if(this.cookie.check('indexusu')){
    this.global.obtenerPublicaciones()
    .subscribe(
        mispublicaciones=>{
          this.publicacionesm=[];
          this.publicacionesm=Object.values(mispublicaciones).map(
            (publicacionn)=>{
              const publi=new publicacione('','','');
              Object.assign(publi,publicacionn)
              return publi;
            }
          )
          this.cargando=false;
        },
        error=>{
          console.log('no se pudieron obtener los datos verifique su conexion',error)
        }
      )
    }
  }

  ngOnInit(): void {
    this.obtener();
    this.ecuchar();
    // const intervalSeconds = 2000; 
    if(this.cookie.check('indexusu')){this.mitoken=this.cookie.get('indexusu');}
  }
  setpublicacion(){
    if(this.cja=="") return;
    this.usuariologueado=JSON.parse(this.cookie.get('usuarioLogueado'));
    this.laspublicaciones.insertarpublicacion(this.cja,this.usuariologueado.nombre,this.mitoken);
    this.cja=""
    this.haciaabajo();
  }
  haciaabajo(){
    const container = this.contenedor.nativeElement;
    container.scrollTop=2000000;
  }
}
