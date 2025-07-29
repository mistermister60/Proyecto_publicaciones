import { Component, OnInit } from '@angular/core';
import { colonia } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colonia',
  templateUrl: './colonia.component.html',
  styleUrls: ['./colonia.component.css']
})
export class ColoniaComponent implements OnInit {
  TUser: any = [];
  user: colonia = {
    Id_Col: null,
    Det_col: '',
    Estado: 'Activo'
  };

  showModal = false;

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.Data.getAll('/colonia')
      .subscribe(
        res => { this.TUser = res; },
        err => console.error(err)
      );
  }

  guardarColonia() {
    if (!this.user.Det_col) {
      Swal.fire('Campos incompletos', 'Debe ingresar el detalle de la colonia', 'warning');
      return;
    }

    const newUser: colonia = {
      Id_Col: null,
      Det_col: this.user.Det_col,
      Estado: 'Activo'
    };

    this.Data.save(newUser, '/colonia').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = { Id_Col: null, Det_col: '', Estado: 'Activo' };
        Swal.fire('¡Guardado!', 'La colonia ha sido guardada.', 'success');
      },
      err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo guardar el registro', 'error');
      }
    );
  }

  EliminarData(id: number) {
    this.Data.delete(id, '/colonia').subscribe(
      res => this.getUser(),
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

  openEditModal(user: colonia) {
    Swal.fire({
      title: 'Editar Colonia',
      html: `
        <input type="text" id="edit_det_col" class="swal2-input" placeholder="Detalle de Colonia" value="${user.Det_col}">
        <select id="edit_estado" class="swal2-input">
          <option value="Activo" ${user.Estado === 'Activo' ? 'selected' : ''}>Activo</option>
          <option value="Inactivo" ${user.Estado === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
        </select>
      `,
      confirmButtonText: 'Actualizar',
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: () => {
        const det_col = (document.getElementById('edit_det_col') as HTMLInputElement).value;
        const estado = (document.getElementById('edit_estado') as HTMLSelectElement).value;
        if (!det_col) {
          Swal.showValidationMessage('Debe ingresar el detalle de la colonia');
          return false;
        }
        return { Det_col: det_col, Estado: estado };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser: colonia = {
          Id_Col: user.Id_Col,
          Det_col: result.value.Det_col,
          Estado: result.value.Estado
        };

        this.Data.update(updatedUser.Id_Col!, updatedUser, '/colonia').subscribe(
          res => {
            this.getUser();
            Swal.fire('¡Actualizado!', 'El registro ha sido actualizado.', 'success');
          },
          err => {
            console.error(err);
            Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
          }
        );
      }
    });
  }
}