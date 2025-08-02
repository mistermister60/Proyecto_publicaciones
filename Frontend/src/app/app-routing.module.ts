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
import { AuthGuard } from './Services/auth.guard';
import { NoAutorizadoComponent } from './Component/no-autorizado/no-autorizado.component';
import { LoginComponent } from './Component/login/login.component';
import { RoleGuard } from './Services/role.guard';
const routes: Routes = [
  {
    path: 'colonia',
    component :ColoniaComponent,
     canActivate:  [RoleGuard] ,data: { roles: [1,3]  }
  },
    {
    path: 'direccionlugar',
    component :DireccionlugarComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2,3]  }
  },
    {
    path: 'empresa',
    component :EmpresaComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,3]  }
  },
    {
    path: 'perfilempresa',
    component :PerfilempresaComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,3]  }
  },
    {
    path: 'perfilusuario',
    component :PerfilusuarioComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1]  }
  },
      {
    path: 'publicacion',
    component :PublicacionComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2,3]  }
  },
      {
    path: 'publicacionempresa',
    component :PublicacionempresaComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,3]  }
  },
      {
    path: 'servicio',
    component :ServicioComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,3]  }
  },
      {
    path: 'usuario',
    component :UsuarioComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2,3]  }
  },
  {
  path: 'login',
  component:LoginComponent

},
{
  path: 'no-autorizado',
  component:NoAutorizadoComponent

},

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // Ruta para manejar rutas no definidas
  {
    path: '**',
    redirectTo: '/login'
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
