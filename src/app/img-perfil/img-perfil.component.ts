import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { equalTo, get, getDatabase, orderByChild,query,update } from 'firebase/database';
import { ModiusuarioService } from '../service/modiusuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-img-perfil',
  templateUrl: './img-perfil.component.html',
  styleUrls: ['./img-perfil.component.css']
})
export class ImgPerfilComponent implements OnInit{

  urlimgactual='';
  @ViewChild('mifoto', { static: true }) miElementoRef: ElementRef;
  @ViewChild('enviar', { static: true }) btnenviar: ElementRef;
  imag:File;
  ngOnInit(): void {
    if(this.cookie.check('usuarioLogueado')){
      const usu=JSON.parse(this.cookie.get('usuarioLogueado'));
      this.urlimgactual=usu.urlImg;
      if(this.urlimgactual!=''){
        this.miElementoRef.nativeElement.src=this.urlimgactual;
      }
    }
  }
  cargarImagen(e:any){
    this.imag=e.target.files[0];
    if(this.imag){
      this.urlimgactual=URL.createObjectURL(this.imag);
      this.miElementoRef.nativeElement.src=this.urlimgactual;
    }
  }
  async mandarImg(){
    if(!this.imag){
      alert('no has seleccionado una imagen de perfil')
      return;
    }
    this.btnenviar.nativeElement.disabled=true;
    let nombreImg='';
    const usu=JSON.parse(this.cookie.get('usuarioLogueado'));
    nombreImg=usu.token;

    const storag=getStorage();
    const referencia=ref(storag,'imPerfilusuarios/'+nombreImg);
    try{
      await uploadBytes(referencia,this.imag);
      let urlimgdescarga= await getDownloadURL(referencia)
      await this.modiusuario.actualizarusua(urlimgdescarga);
      
    }catch{
      alert('no se pudo subir la imagen');
    }
  }

  constructor (private cookie:CookieService,private modiusuario:ModiusuarioService){}

}
