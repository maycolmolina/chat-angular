import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent {
  constructor(private rutas : Router){}
  ir(cadena:string){
    this.rutas.navigate(['login']);
  }
}
