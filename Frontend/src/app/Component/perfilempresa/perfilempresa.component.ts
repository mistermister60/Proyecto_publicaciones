import { Component, OnInit  } from '@angular/core';
import {  perfilempresa } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
@Component({
  selector: 'app-perfilempresa',
  templateUrl: './perfilempresa.component.html',
  styleUrls: ['./perfilempresa.component.css']
})
export class PerfilempresaComponent implements OnInit {
  TUser: any = [];
  user: perfilempresa = {
  Id_pemp: null,
  Inf_pemp: null,
  des_pemp: null,
  Id_emp: null,
  Estado: 'Activo'
  }
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/perfilempresa')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
AgregarValor(){
    delete this.user.Id_pemp;   
    this.Data.save(this.user,'/perfilempresa')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/perfilempresa')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }


}
