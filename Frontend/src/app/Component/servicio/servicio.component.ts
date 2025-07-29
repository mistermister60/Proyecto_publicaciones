import { Component, OnInit } from '@angular/core';
import {  servicio} from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit{
  TUser: any = [];
  user: servicio = {
  Id_serv: null,
  Det_sev: null,
  Estado: 'Activo'
  }
  
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/servicio')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
  AgregarValor(){
    delete this.user.Id_serv;   
    this.Data.save(this.user,'/servicio')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/servicio')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
