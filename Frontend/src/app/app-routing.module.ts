import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColoniaComponent } from './Component/colonia/colonia.component';
import { DireccionlugarComponent } from './Component/direccionlugar/direccionlugar.component';
import { EmpresaComponent } from './Component/empresa/empresa.component';
import { PerfilempresaComponent } from './Component/perfilempresa/perfilempresa.component';
import { PerfilusuarioComponent } from './Component/perfilusuario/perfilusuario.component';
import { PublicacionComponent } from './Component/publicacion/publicacion.component';
import { PublicacionempresaComponent } from './Component/publicacionempresa/publicacionempresa.component';
import { ServicioComponent } from './Component/servicio/servicio.component';
import { UsuarioComponent } from './Component/usuario/usuario.component';
const routes: Routes = [
  {
    path: 'colonia',
    component :ColoniaComponent
  },
    {
    path: 'direccionlugar',
    component :DireccionlugarComponent
  },
    {
    path: 'empresa',
    component :EmpresaComponent
  },
    {
    path: 'perfilempresa',
    component :PerfilempresaComponent
  },
    {
    path: 'perfilusuario',
    component :PerfilusuarioComponent
  },
      {
    path: 'publicacion',
    component :PublicacionComponent
  },
      {
    path: 'publicacionempresa',
    component :PublicacionempresaComponent
  },
      {
    path: 'servicio',
    component :ServicioComponent
  },
      {
    path: 'usuario',
    component :UsuarioComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
