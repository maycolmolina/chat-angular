import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent {

  constructor(private rutas:Router){

  }

  ir(cadena:string){
    this.rutas.navigate([cadena]);
  }

}
