import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  TUser: any = [];
  user: usuario = {
  Id_usu: null,
  Ma_usu: null,
  Nom_usu: null,
  Pes_usu: null,
  Nac_usu: null,
  Ban_usu: null,
  Reponsable_usu: null,
  Estado: 'Activo'
  }
  
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/usuario')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
  AgregarValor(){
    delete this.user.Id_usu;   
    this.Data.save(this.user,'/usuario')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/usuario')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
