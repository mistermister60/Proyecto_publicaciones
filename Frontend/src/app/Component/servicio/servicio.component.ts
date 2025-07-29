import { Component, OnInit } from '@angular/core';
import {  servicio} from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit{
  TUser: any = [];
            @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
      name = 'ServicioData.xlsx';
  user: servicio = {
  Id_serv: null,
  Det_sev: null,
  Estado: 'Activo'
  }
    showModal = false;
    showEditModal = false;
    editDireccion: servicio = { 
      Id_serv: null, 
      Det_sev: '', 
      Estado: 'Activo' 
    };
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
 ModalGuardar() {
    if (!this.user.Det_sev) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }

    const newUser: servicio = {
      Id_serv: null,
      Det_sev: this.user.Det_sev,
      Estado: 'Activo'
    };

    this.Data.save(newUser, '/servicio').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = { Id_serv: null, Det_sev: '', Estado: 'Activo' };
        Swal.fire('¡Guardado!', 'El registro ha sido guardado correctamente.', 'success');
      },
      err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo guardar el registro', 'error');
      }
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
  
      openEditModal(user: servicio) {
      this.editDireccion = { ...user };
      this.showEditModal = true;
    }
  
    closeEditModal() {
      this.showEditModal = false;
      this.editDireccion = {      
         Id_serv: null, 
      Det_sev: '', 
      Estado: 'Activo' };
    }
      actualizar() {
      if (!this.editDireccion.Det_sev) {
        Swal.fire('Campos incompletos', 'Debe ingresar el detalle del servicio', 'warning');
        return;
      }
      this.Data.update(this.editDireccion.Id_serv!, this.editDireccion, '/servicio').subscribe(
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
      PDF.save('Servicio.pdf');
    });
  }

}
