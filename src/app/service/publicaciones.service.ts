import { Injectable } from '@angular/core';
import { publicacione } from '../zzobject.model/publicaciones.model';
import { GlobalbaseService } from './globalbase.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  constructor(private global: GlobalbaseService) { }
  insertarpublicacion(texto:string,autor:string , token:string){
    let publicacion=new publicacione(texto,autor,token);
    this.global.insertar_publicaciones(publicacion);
  }
}
