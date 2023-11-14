import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent {

  constructor(private rutas:Router){}

  ir(cadena:string){

    this.rutas.navigate(['login']);

  }

}
