import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Injectable } from '@angular/core';

@Injectable()

export class guardian implements CanActivate{
    constructor(private router:Router,private cookie : CookieService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
        if(this.cookie.check('indexusu'))
        {
            return true;
        }
        else{
            this.router.navigate(['aviso'])
            return false;
        }
    }
    
}

