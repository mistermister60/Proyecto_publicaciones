import { Component, OnInit  } from '@angular/core';
import {  perfilusuario } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnInit {
  TUser: any = [];
      @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
      name = 'PerfilUsuarioData.xlsx';
  user: perfilusuario = {
  id_per: null,
  des_per: null,
  id_isu: null,
  estado: 'Activo'
  }
      Usuariolist: any;
        showModal = false;
          showEditModal = false;
        editDireccion: perfilusuario = {
          id_per: null,
          des_per: '',
          id_isu: null,
          estado: 'Activo'
        };
    constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getDropListUsuario();
  }
      getDropListUsuario() {
    this.Data.getDropListUsuario().subscribe((data: any) => {
    this.Usuariolist = Array.isArray(data)
      ? data.filter((empresa: any) => empresa.Estado === 'Activo')
      : [];
  });
  }
  getUser() {
    this.Data.getAll('/perfilusuario')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
ModalGuardar() {
    if (!this.user.des_per || !this.user.id_isu) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    const newUser: perfilusuario = {
      id_per: null,
      des_per: this.user.des_per,
      id_isu: this.user.id_isu,
      estado: 'Activo'
    };
    this.Data.save(newUser, '/perfilusuario').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = {
          id_per: null,
          des_per: '',
          id_isu: null,
          estado: 'Activo'
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
    this.Data.delete(id, '/perfilusuario')
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
      openEditModal(user: perfilusuario) {
        this.editDireccion = { ...user };
        this.showEditModal = true;
      }
    
      closeEditModal() {
        this.showEditModal = false;
            this.editDireccion = {
          id_per: null,
          des_per: '',
          id_isu: null,
          estado: 'Activo'
        };
      }
        actualizar() {
        if (!this.editDireccion.des_per || !this.editDireccion.id_isu) {
          Swal.fire('Campos incompletos', 'Debe ingresar el detalle de la colonia', 'warning');
          return;
        }
        console.log('Objeto enviado:', this.editDireccion);
        this.Data.update(this.editDireccion.id_per!, this.editDireccion, '/perfilusuario').subscribe(
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
  return this.TUser.filter((col: any) => col.estado === this.estadoFiltro);
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
      PDF.save('Perfil Usuarios.pdf');
    });
  }

}
