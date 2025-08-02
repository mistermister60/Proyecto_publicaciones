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
import { FilterempresaPipe } from './Pipes/FilterEmpresa/filterempresa.pipe';
import { FiltercoloniaPipe } from './Pipes/FilterColonia/filtercolonia.pipe';
import { FilterdireccionlugarPipe } from './Pipes/FilterDireccionLugar/filterdireccionlugar.pipe';
import { FilterperfilempresaPipe } from './Pipes/FilterPerfilEmpresa/filterperfilempresa.pipe';
import { FilterperfilusuarioPipe } from './Pipes/FilterPerfilUsuario/filterperfilusuario.pipe';
import { FilterpublicacionPipe } from './Pipes/FilterPublicacion/filterpublicacion.pipe';
import { FilterpublicacionempresaPipe } from './Pipes/FilterPublicacionEmpresa/filterpublicacionempresa.pipe';
import { FilterservicioPipe } from './Pipes/FilterServicio/filterservicio.pipe';
import { FilterusuarioPipe } from './Pipes/FilterUsuario/filterusuario.pipe';
import { NoAutorizadoComponent } from './Component/no-autorizado/no-autorizado.component';
import { LoginComponent } from './Component/login/login.component';
import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt'
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
    UsuarioComponent,
    FilterempresaPipe,
    FiltercoloniaPipe,
    FilterdireccionlugarPipe,
    FilterperfilempresaPipe,
    FilterperfilusuarioPipe,
    FilterpublicacionPipe,
    FilterpublicacionempresaPipe,
    FilterservicioPipe,
    FilterusuarioPipe,
    NoAutorizadoComponent,
    LoginComponent
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
  providers: [DataService, { provide: JWT_OPTIONS, 
      useValue: JWT_OPTIONS },
    JwtHelperService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
