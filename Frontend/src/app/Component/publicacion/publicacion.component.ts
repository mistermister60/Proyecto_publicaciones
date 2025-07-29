import { Component, OnInit } from '@angular/core';
import {  publicacion } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit{
  TUser: any = [];
  user: publicacion = {
  Id_Pub:  null,
  Id_usu: null,
  Det_pub: null,
  Id_emp: null,
  Estado: 'Activo'
  }
  
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/publicacion')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
  AgregarValor(){
    delete this.user.Id_Pub;   
    this.Data.save(this.user,'/publicacion')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/publicacion')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
