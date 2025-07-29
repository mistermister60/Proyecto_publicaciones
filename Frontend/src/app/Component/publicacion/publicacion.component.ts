import { Component, OnInit } from '@angular/core';
import {  publicacion } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit{
  TUser: any = [];
        @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
  name = 'PublicacionData.xlsx';
  user: publicacion = {
  Id_Pub:  null,
  Id_usu: null,
  Det_pub: null,
  Id_emp: null,
  Estado: 'Visible'
  }
      Usuariolist: any;
      Empresalist: any;
        showModal = false;
          showEditModal = false;
        editDireccion: publicacion = {
          Id_Pub: null,
          Id_usu: null,
          Det_pub: '',
          Id_emp: null,
          Estado: 'Visible'
        };
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getDropListUsuario();
    this.getDropListEmpresa();
  }

  getUser() {
    this.Data.getAll('/publicacion')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
ModalGuardar() {
    if (!this.user.Id_usu || !this.user.Det_pub || !this.user.Id_emp) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    const newUser: publicacion = {
      Id_Pub: null,
      Id_usu: this.user.Id_usu,
      Det_pub: this.user.Det_pub,
      Id_emp: this.user.Id_emp,
      Estado: 'Visible'
    };
    this.Data.save(newUser, '/publicacion').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = {
          Id_Pub: null,
          Id_usu: null,
          Det_pub: '',
          Id_emp: null,
          Estado: 'Visible'
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
    this.Data.delete(id, '/publicacion')
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
        openEditModal(user: publicacion) {
                this.editDireccion = { ...user };
                this.showEditModal = true;
              }
            
              closeEditModal() {
                this.showEditModal = false;
                    this.editDireccion = {
          Id_Pub: null,
          Id_usu: null,
          Det_pub: '',
          Id_emp: null,
          Estado: 'Visible'
                };
              }
                actualizar() {
                if (!this.editDireccion.Id_usu || !this.editDireccion.Det_pub || !this.editDireccion.Id_emp) {
                  Swal.fire('Campos incompletos', 'Debe ingresar el detalle de la colonia', 'warning');
                  return;
                }
                this.Data.update(this.editDireccion.Id_Pub!, this.editDireccion, '/publicacion').subscribe(
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

          getDropListUsuario() {
    this.Data.getDropListUsuario().subscribe((data: any) => {
    this.Usuariolist = Array.isArray(data)
      ? data.filter((usuario: any) => usuario.Estado === 'Activo')
      : [];
  });
  }
        getDropListEmpresa() {
    this.Data.getDropListEmpresa().subscribe((data: any) => {
    this.Empresalist = Array.isArray(data)
      ? data.filter((empresa: any) => empresa.Estado === 'Activo')
      : [];
  });
  }
                  estadoFiltro: 'Visible' | 'Oculto' = 'Visible';

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
      PDF.save('Publicacion.pdf');
    });
  }

}
