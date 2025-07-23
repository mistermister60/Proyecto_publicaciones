import { Component, OnInit  } from '@angular/core';
import {  colonia } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-colonia',
  templateUrl: './colonia.component.html',
  styleUrls: ['./colonia.component.css']
})
export class ColoniaComponent implements OnInit  {
  TUser: any = [];
  user: colonia = {
    Id_Col:  null ,
    Det_col: null,
    Estado: 'Activo'
  }

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/colonia')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

}
