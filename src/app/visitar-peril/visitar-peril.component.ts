import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MisusuariosService } from '../service/misusuarios.service';
import { usuario } from '../zzobject.model/usuario.model';

@Component({
  selector: 'app-visitar-peril',
  templateUrl: './visitar-peril.component.html',
  styleUrls: ['./visitar-peril.component.css']
})
export class VisitarPerilComponent implements OnInit {
  id:string;
  constructor(private rutas: ActivatedRoute,private misausuarios:MisusuariosService){}
  usuarioActual:usuario=new usuario('','','','');
  mostrar=true;
  urlImg="./5087579.png";
  ngOnInit(): void {
    this.id=this.rutas.snapshot.params['id'];
    this.misausuarios.getUsuarioVisitar(this.id).then(
      objetoCom=>{
        if(objetoCom.exists()){
          this.mostrar=true;
          let p=Object.keys(objetoCom.val());
          this.usuarioActual=Object.assign(objetoCom.val()[p[0]]);
          
          if(this.usuarioActual.urlImg!=undefined){
            if(this.usuarioActual.urlImg!=""){
              this.urlImg=this.usuarioActual.urlImg;
            }
          }
        }
      }
    ).catch(
      error=>{
        alert ('error al cargar este usuario');
      }
    );

  }




}
