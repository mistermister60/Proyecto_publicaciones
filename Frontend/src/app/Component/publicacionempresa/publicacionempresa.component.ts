import { Component, OnInit } from '@angular/core';
import {  publicacionempresa } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';


@Component({
  selector: 'app-publicacionempresa',
  templateUrl: './publicacionempresa.component.html',
  styleUrls: ['./publicacionempresa.component.css']
})
export class PublicacionempresaComponent implements OnInit{
  TUser: any = [];
  user: publicacionempresa = {
  Id_pube: null,
  Det_pube:  null,
  Id_emp:  null,
  Estado: 'Activo'
  }
  
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/publicacionempresa')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
  AgregarValor(){
    delete this.user.Id_pube;   
    this.Data.save(this.user,'/publicacionempresa')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/publicacionempresa')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
