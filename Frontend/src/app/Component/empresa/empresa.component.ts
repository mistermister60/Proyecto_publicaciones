import { Component, OnInit  } from '@angular/core';
import {  empresa } from 'src/app/Interfaces/user';
import { DataService } from '../../Services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit{
  TUser: any = [];
  @ViewChild('htmlData') htmlData!: ElementRef;
  filterPost = '';
  name = 'EmpresaData.xlsx';
  user: empresa = {
  Id_emp: null,
  Nom_emp: null,
  Mail_Emp: null,
  Pas_emp: null,
  Id_Dil: null,
  Id_Serv: null,
  Estado: 'Activo'
  }
      DireccionLugarlist: any;
      Serviciolist: any;
        showModal = false;
          showEditModal = false;
        editDireccion: empresa = {
          Id_emp: null,
          Nom_emp: '',
          Mail_Emp: '',
          Pas_emp: '',
          Id_Dil: null,
          Id_Serv: null,
          Estado: 'Activo'
        };
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getDropListServicio();
    this.getDropListDireccionLugar();
  }
      getDropListServicio() {
    this.Data.getDropListServicio().subscribe((data: any) => {
    this.Serviciolist = Array.isArray(data)
      ? data.filter((servicio: any) => servicio.Estado === 'Activo')
      : [];
  });
  }
  getDropListDireccionLugar() {
    this.Data.getDropListDireccionLugar().subscribe((data: any) => {
    this.DireccionLugarlist = Array.isArray(data)
      ? data.filter((direccion: any) => direccion.Estado === 'Activo')
      : [];
  });
  }
  getUser() {
    this.Data.getAll('/empresa')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }
 ModalGuardar() {
    if (!this.user.Nom_emp || !this.user.Mail_Emp || !this.user.Pas_emp || !this.user.Id_Dil || !this.user.Id_Serv) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }
    const newUser: empresa = {
      Id_emp: null,
      Nom_emp: this.user.Nom_emp,
      Mail_Emp: this.user.Mail_Emp,
      Pas_emp: this.user.Pas_emp,
      Id_Dil: this.user.Id_Dil,
      Id_Serv: this.user.Id_Serv,
      Estado: 'Activo'
    };
    this.Data.save(newUser, '/empresa').subscribe(
      res => {
        this.getUser();
        this.showModal = false;
        this.user = {
          Id_emp: null,
          Nom_emp: '',
          Mail_Emp: '',
          Pas_emp: '',
          Id_Dil: null,
          Id_Serv: null,
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
    this.Data.delete(id, '/empresa')
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
        openEditModal(user: empresa) {
          this.editDireccion = { ...user };
          this.showEditModal = true;
        }
      
        closeEditModal() {
          this.showEditModal = false;
              this.editDireccion = {
            Id_emp: null,
            Nom_emp: '',
            Mail_Emp: '',
            Pas_emp: '',
            Id_Dil: null,
            Id_Serv: null,
            Estado: 'Activo'
          };
        }
          actualizar() {
          if (!this.editDireccion.Nom_emp || !this.editDireccion.Mail_Emp || 
            !this.editDireccion.Pas_emp || !this.editDireccion.Id_Dil || !this.editDireccion.Id_Serv) {
            Swal.fire('Campos incompletos', 'Debe ingresar todos los campos', 'warning');
            return;
          }
          this.Data.update(this.editDireccion.Id_emp!, this.editDireccion, '/empresa').subscribe(
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
      PDF.save('empresas.pdf');
    });
  }
getDireccionNombre(id: number): string {
  const direccion = this.DireccionLugarlist?.find((d: any) => d.Id_Dr === id);
  return direccion ? direccion.col_dl : '';
}

getServicioNombre(id: number): string {
  const servicio = this.Serviciolist?.find((s: any) => s.Id_serv === id);
  return servicio ? servicio.Det_sev : '';
}
}
