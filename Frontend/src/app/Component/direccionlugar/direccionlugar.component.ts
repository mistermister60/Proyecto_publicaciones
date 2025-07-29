import { Component, OnInit  } from '@angular/core';
import { direccionlugar } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-direccionlugar',
  templateUrl: './direccionlugar.component.html',
  styleUrls: ['./direccionlugar.component.css']
})
export class DireccionlugarComponent implements OnInit {
  TUser: any = [];
  user: direccionlugar = {
    Id_Dr: null,
    col_dl: null,
    num_dl: null,
    Id_Col: null,
    Estado: 'Activo'
  }
  Colonialist: any;
  showModal = false;
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getDropListColonia(); // Asegura que Colonialist esté cargado
  }

  getUser() {
    this.Data.getAll('/direccionlugar')
      .subscribe(res => {
        this.TUser = res;
      }, err => console.error(err));
  }

  ModalGuardar() {
    if (!this.user.col_dl || !this.user.num_dl || !this.user.Id_Col) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    const newUser: direccionlugar = {
      Id_Dr: null,
      col_dl: this.user.col_dl,
      num_dl: this.user.num_dl,
      Id_Col: this.user.Id_Col,
      Estado: 'Activo'
    };
    this.Data.save(newUser, '/direccionlugar').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = {
          Id_Dr: null,
          col_dl: '',
          num_dl: '',
          Id_Col: null,
          Estado: 'Activo'
        };
        Swal.fire('¡Guardado!', 'El registro ha sido guardado correctamente.', 'success');
      },
      err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo guardar el registro', 'error');
      }
    );
  }

  EliminarData(id: number) {
    this.Data.delete(id, '/direccionlugar')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }

  confirmarEliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EliminarData(id);
        Swal.fire('¡Eliminado!', 'El registro ha sido eliminado.', 'success');
      }
    });
  }

  getDropListColonia() {
    this.Data.getDropListColonias().subscribe((data: any) => {
    this.Colonialist = Array.isArray(data)
      ? data.filter((col: any) => col.Estado === 'Activo')
      : [];
  });
  }

  ModalEditar(user: direccionlugar) {


  }


}