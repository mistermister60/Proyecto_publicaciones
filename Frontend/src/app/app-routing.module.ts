import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColoniaComponent } from './Component/colonia/colonia.component';
const routes: Routes = [
  {
    path: 'colonia',
    component :ColoniaComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
