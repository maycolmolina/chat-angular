import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { initializeApp } from "firebase/app";
// componentes
import { CabeceraComponent } from './seccionesp/cabecera/cabecera.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { LogueoComponent } from './logueo/logueo.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { HomeComponent } from './home/home.component';
import { CrearusuarioComponent } from './crearusuario/crearusuario.component';
import { SalirComponent } from './salir/salir.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { AvisoComponent } from './aviso/aviso.component';
import { ModificarContraseniaComponent } from './modificar-contrasenia/modificar-contrasenia.component';
import { MiUsuarioMComponent } from './mi-usuario-m/mi-usuario-m.component';
import { ImgPerfilComponent } from './img-perfil/img-perfil.component';
import { VisitarPerilComponent } from './visitar-peril/visitar-peril.component';

// servicios
import { ModiusuarioService } from './service/modiusuario.service';
import { UsuariosmodService } from './service/usuariosmod.service';
import { guardian } from './service/guardianlogin';
import { GlobalbaseService } from './service/globalbase.service';
import { MisusuariosService } from './service/misusuarios.service';

export const firebaseConfig = {
  apiKey: "AIzaSyCnFu478sWifYxM7-1GXylIw7bSNudLZKY",
  authDomain: "proyecto-chat-e71cc.firebaseapp.com",
  databaseURL: "https://proyecto-chat-e71cc-default-rtdb.firebaseio.com",
  projectId: "proyecto-chat-e71cc",
  storageBucket: "proyecto-chat-e71cc.appspot.com",
  messagingSenderId: "913115097308",
  appId: "1:913115097308:web:5eb1f25ffa1670d9aeac19",
  measurementId: "G-GH2XHV4PJY"
};



const app = initializeApp(firebaseConfig);


const root:Routes=[
  {path:'mensajes', component:MensajesComponent,canActivate:[guardian]},
  {path:'ajustes', component:AjustesComponent,canActivate:[guardian]},
  {path:'preguntas', component:PreguntasComponent},
  {path:'perfil', component:HomeComponent},
  {path:'publicaciones', component:PublicacionesComponent ,canActivate:[guardian] },
  {path:'login', component:LogueoComponent},
  {path:'crearusuario', component:CrearusuarioComponent},
  {path:'', component:LogueoComponent},
  {path:'salir', component:SalirComponent ,canActivate:[guardian]},
  {path:'cambioseguridad', component:ModificarContraseniaComponent,canActivate:[guardian]},
  {path:'aviso', component:AvisoComponent},
  {path:'modiusu', component:MiUsuarioMComponent,canActivate:[guardian]},
  {path:'subirfoto', component:ImgPerfilComponent,canActivate:[guardian]},
  {path:'visitarPerfil/:id' , component:VisitarPerilComponent ,canActivate:[guardian]}
]


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PublicacionesComponent,
    LogueoComponent,
    MensajesComponent,
    PreguntasComponent,
    HomeComponent,
    CrearusuarioComponent,
    SalirComponent,
    AjustesComponent,
    AvisoComponent,
    ModificarContraseniaComponent,
    MiUsuarioMComponent,
    ImgPerfilComponent,
    VisitarPerilComponent,
  ],
  imports: [
    BrowserModule,FormsModule,
    RouterModule.forRoot(root),
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [MisusuariosService,GlobalbaseService,CookieService,guardian,UsuariosmodService,ModiusuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }


