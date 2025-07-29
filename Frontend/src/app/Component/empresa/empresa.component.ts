import { Component, OnInit  } from '@angular/core';
import {  empresa } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit{
  TUser: any = [];
  user: empresa = {
  Id_emp: null,
  Nom_emp: null,
  Mail_Emp: null,
  Pas_emp: null,
  Id_Dil: null,
  Id_Serv: null,
  Estado: 'Activo'
  }
  
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/empresa')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
  AgregarValor(){
    delete this.user.Id_emp;   
    this.Data.save(this.user,'/empresa')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/empresa')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
