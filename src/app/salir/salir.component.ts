import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent implements OnInit{
  constructor(private cookie: CookieService , private router:Router){}
  ngOnInit(): void {

    if(this.cookie.check('indexusu')!=true){
      this.router.navigate(['login']);
    }

  }
  salir(){
    this.cookie.delete('indexusu');
    this.cookie.delete('usuarioLogueado');
    window.location.reload();
    
  }
  ir(cadena:string){
    this.router.navigate(['ajustes'])
  }
}
