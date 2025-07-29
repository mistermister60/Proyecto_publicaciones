import { Component, OnInit } from '@angular/core';
import { colonia } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-colonia',
  templateUrl: './colonia.component.html',
  styleUrls: ['./colonia.component.css']
})
export class ColoniaComponent implements OnInit {
  TUser: any = [];
  @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
  name = 'ColoniaData.xlsx';
  user: colonia = {
    Id_Col: null,
    Det_col: '',
    Estado: 'Activo'
  };

  showModal = false;
  showEditModal = false;
  editColonia: colonia = { Id_Col: null, Det_col: '', Estado: 'Activo' };

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
    this.editColonia = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editColonia = { Id_Col: null, Det_col: '', Estado: 'Activo' };
  }
    actualizar() {
    if (!this.editColonia.Det_col) {
      Swal.fire('Campos incompletos', 'Debe ingresar el detalle de la colonia', 'warning');
      return;
    }
    this.Data.update(this.editColonia.Id_Col!, this.editColonia, '/colonia').subscribe(
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

getColoniasFiltradas() {
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
      PDF.save('Colonia.pdf');
    });
  }

}