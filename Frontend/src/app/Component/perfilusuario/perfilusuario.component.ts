import { Component, OnInit  } from '@angular/core';
import {  perfilusuario } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnInit {
  TUser: any = [];
  user: perfilusuario = {
  id_per: null,
  des_per: null,
  id_isu: null,
  Estado: 'Activo'
  }
    constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/perfilusuario')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
  AgregarValor(){
    delete this.user.id_per;   
    this.Data.save(this.user,'/perfilusuario')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/perfilusuario')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
