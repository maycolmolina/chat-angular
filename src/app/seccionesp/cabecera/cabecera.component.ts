import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  
  constructor(private activ:Router, private cookie:CookieService ){}
  ngOnInit(): void {
  }
  ir(enlace:string){
    this.activ.navigate([enlace])
  }

  estaloguado()
  {
    if(this.cookie.check('indexusu')){
      return true;
    }else{
      return false;
    }
  }
}
