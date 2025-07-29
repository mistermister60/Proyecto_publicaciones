import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/Interfaces/user';
import { ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../Services/data.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  TUser: any = [];
              @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
        name = 'UsuarioData.xlsx';
  user: usuario = {
  Id_usu: null,
  Ma_usu: null,
  Nom_usu: null,
  Pes_usu: null,
  Nac_usu: '',
  Ban_usu: false,
  Reponsable_usu: false,
  Estado: 'Activo'
  }
      showModal = false;
      showEditModal = false;
  editDireccion: usuario = {
    Id_usu: null,
    Ma_usu: '',
    Nom_usu: '',
    Pes_usu: '',
    Nac_usu: '',
    Ban_usu: false,
    Reponsable_usu: false,
    Estado: 'Activo'
  };

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/usuario')
      .subscribe(res => {
          this.TUser = res;
        this.normalizeBooleanFields();
        }, err => console.error(err));
  }
 ModalGuardar() {
    if (!this.user.Ma_usu || !this.user.Nom_usu || !this.user.Pes_usu || !this.user.Nac_usu) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    const newUser: usuario = {
      Id_usu: null,
      Ma_usu: this.user.Ma_usu,
      Nom_usu: this.user.Nom_usu,
      Pes_usu: this.user.Pes_usu,
      Nac_usu: this.user.Nac_usu,
      Ban_usu: this.user.Ban_usu,
      Reponsable_usu: this.user.Reponsable_usu,
      Estado: 'Activo'
    };
    this.Data.save(newUser, '/usuario').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = {
          Id_usu: null,
          Ma_usu: '',
          Nom_usu: '',
          Pes_usu: '',
          Nac_usu: '',
          Ban_usu: false,
          Reponsable_usu: false,
          Estado: 'Activo'
        };
        Swal.fire('¡Guardado!', 'El usuario ha sido guardado.', 'success');
      },
      err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo guardar el usuario', 'error');
      }
    );
  }
    openEditModal(user: usuario) {
    this.editDireccion = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editDireccion = {
      Id_usu: null,
      Ma_usu: '',
      Nom_usu: '',
      Pes_usu: '',
      Nac_usu: '',
      Ban_usu: false,
      Reponsable_usu: false,
      Estado: 'Activo'
    };
  }

  actualizar() {
    if (!this.editDireccion.Ma_usu || !this.editDireccion.Nom_usu || !this.editDireccion.Pes_usu || !this.editDireccion.Nac_usu) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    this.Data.update(this.editDireccion.Id_usu!, this.editDireccion, '/usuario').subscribe(
      res => {
        this.getUser();
        this.closeEditModal();
        Swal.fire('¡Actualizado!', 'El usuario ha sido actualizado.', 'success');
      },
      err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
      }
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
    normalizeBooleanFields() {
  this.TUser.forEach((user: any) => {
    user.Ban_usu = user.Ban_usu === true || user.Ban_usu === 1 || user.Ban_usu === 'true';
    user.Reponsable_usu = user.Reponsable_usu === true || user.Reponsable_usu === 1 || user.Reponsable_usu === 'true';
  });
}
              estadoFiltro: 'Activo' | 'Inactivo' = 'Activo';

getFiltradas() {
  return this.TUser.filter((col: any) => col.Estado === this.estadoFiltro);
}
exportToExcel(): void {
    let element = document.getElementById('tabla');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, this.name);
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('tabla');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Usuarios.pdf');
    });
  }

}
