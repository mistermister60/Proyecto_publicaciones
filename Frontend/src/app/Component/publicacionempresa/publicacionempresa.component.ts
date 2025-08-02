import { Component, OnInit } from '@angular/core';
import {  publicacionempresa } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-publicacionempresa',
  templateUrl: './publicacionempresa.component.html',
  styleUrls: ['./publicacionempresa.component.css']
})
export class PublicacionempresaComponent implements OnInit{
  TUser: any = [];
          @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
    name = 'PublicacionEmpresaData.xlsx';
  user: publicacionempresa = {
  Id_pube: null,
  Det_pube:  null,
  Id_emp:  null,
  Estado: 'Publicado'
  }
        Empresalist: any;
          showModal = false;
            showEditModal = false;
          editDireccion: publicacionempresa = {
            Id_pube: null,
            Det_pube: '',
            Id_emp: null,
            Estado: 'Publicado'
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
    this.Data.getAll('/publicacionempresa')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
ModalGuardar() {
    if (!this.user.Det_pube || !this.user.Id_emp) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    const newUser: publicacionempresa = {
      Id_pube: null,
      Det_pube: this.user.Det_pube,
      Id_emp: this.user.Id_emp,
      Estado: 'Publicado'
    };
    this.Data.save(newUser, '/publicacionempresa').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = {
          Id_pube: null,
          Det_pube: '',
          Id_emp: null,
          Estado: 'Publicado'
        };
        Swal.fire('¡Guardado!', 'El registro ha sido guardado correctamente.', 'success');
      },
      err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo guardar el registro', 'error');
      }
    );
  }
        openEditModal(user: publicacionempresa) {
          this.editDireccion = { ...user };
          this.showEditModal = true;
        }
      
        closeEditModal() {
          this.showEditModal = false;
              this.editDireccion = {
          Id_pube: null,
          Det_pube: '',
          Id_emp: null,
          Estado: 'Publicado'
          };
        }
          actualizar() {
          if (!this.editDireccion.Det_pube || !this.editDireccion.Id_emp) {
            Swal.fire('Campos incompletos', 'Debe ingresar el detalle de la colonia', 'warning');
            return;
          }
          console.log('Objeto enviado:', this.editDireccion);
          this.Data.update(this.editDireccion.Id_pube!, this.editDireccion, '/publicacionempresa').subscribe(
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
  EliminarData(id: number){
    this.Data.delete(id, '/publicacionempresa')
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
                        estadoFiltro: 'Publicado' | 'Borrador' = 'Publicado';

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
      PDF.save('Publicacion Empresa.pdf');
    });
  }
getEmpresaNombre(id: number): string {
  const empresa = this.Empresalist?.find((e: any) => e.Id_emp === id);
  return empresa ? empresa.Nom_emp : '';
}
}
