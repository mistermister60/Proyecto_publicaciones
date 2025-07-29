import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColoniaComponent } from './Component/colonia/colonia.component';
import { DataService } from './Services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { DireccionlugarComponent } from './Component/direccionlugar/direccionlugar.component';
import { EmpresaComponent } from './Component/empresa/empresa.component';
import { PerfilempresaComponent } from './Component/perfilempresa/perfilempresa.component';
import { PerfilusuarioComponent } from './Component/perfilusuario/perfilusuario.component';
import { PublicacionComponent } from './Component/publicacion/publicacion.component';
import { PublicacionempresaComponent } from './Component/publicacionempresa/publicacionempresa.component';
import { ServicioComponent } from './Component/servicio/servicio.component';
import { UsuarioComponent } from './Component/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ColoniaComponent,
    DireccionlugarComponent,
    EmpresaComponent,
    PerfilempresaComponent,
    PerfilusuarioComponent,
    PublicacionComponent,
    PublicacionempresaComponent,
    ServicioComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
        MatButtonModule,
    MatMenuModule,
    FormsModule    

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
