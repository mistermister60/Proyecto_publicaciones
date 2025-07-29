import { Component, OnInit  } from '@angular/core';
import {  perfilempresa } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-perfilempresa',
  templateUrl: './perfilempresa.component.html',
  styleUrls: ['./perfilempresa.component.css']
})
export class PerfilempresaComponent implements OnInit {
  TUser: any = [];
    @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
    name = 'PerfilempresaData.xlsx';
  user: perfilempresa = {
  Id_pemp: null,
  Inf_pemp: null,
  des_pemp: null,
  Id_emp: null,
  Estado: 'Activo'
  }
    Empresalist: any;
      showModal = false;
        showEditModal = false;
      editDireccion: perfilempresa = {
        Id_pemp: null,
        Inf_pemp: '',
        des_pemp: '',
        Id_emp: null,
        Estado: 'Activo'
      };
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getDropListEmpresa();
  }
    getDropListEmpresa() {
    this.Data.getDropListEmpresa().subscribe((data: any) => {
    this.Empresalist = Array.isArray(data)
      ? data.filter((empresa: any) => empresa.Estado === 'Activo')
      : [];
  });
  }
  getUser() {
    this.Data.getAll('/perfilempresa')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
  ModalGuardar() {
    if (!this.user.Inf_pemp || !this.user.des_pemp || !this.user.Id_emp) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    const newUser: perfilempresa = {
      Id_pemp: null,
      Inf_pemp: this.user.Inf_pemp,
      des_pemp: this.user.des_pemp,
      Id_emp: this.user.Id_emp,
      Estado: 'Activo'
    };
    this.Data.save(newUser, '/perfilempresa').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = {
          Id_pemp: null,
          Inf_pemp: '',
          des_pemp: '',
          Id_emp: null,
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
  EliminarData(id: number){
    this.Data.delete(id, '/perfilempresa')
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
  openEditModal(user: perfilempresa) {
    this.editDireccion = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
        this.editDireccion = {
      Id_pemp: null,
      Inf_pemp: '',
      des_pemp: '',
      Id_emp: null,
      Estado: 'Activo'
    };
  }
    actualizar() {
    if (!this.editDireccion.Inf_pemp || !this.editDireccion.des_pemp || !this.editDireccion.Id_emp) {
      Swal.fire('Campos incompletos', 'Debe ingresar el detalle de la colonia', 'warning');
      return;
    }
    this.Data.update(this.editDireccion.Id_pemp!, this.editDireccion, '/perfilempresa').subscribe(
      res => {
        this.getUser();
        this.closeEditModal();
        Swal.fire('¡Actualizado!', 'El registro ha sido actualizado.', 'success');
      },
      err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      }
    );
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
      PDF.save('Perfil Empresas.pdf');
    });
  }

}
