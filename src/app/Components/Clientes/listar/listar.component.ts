import { Component } from '@angular/core';
import { Cliente } from '../../../Model/Cliente';
import { ClienteServiceService } from '../../../Services/Clientes/cliente-service.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../../Shared/modal-generico/modal-generico.component';
import { AgregarComponent } from '../agregar/agregar.component';
import { EditarComponent } from '../editar/editar.component';
import { ListarComponent as MascotasListar } from '../../Mascotas/listar/listar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
  }


  listar(): void {
    this.clienteService.listar().subscribe(data => {
      if (data != null) {
        this.clientes = data;
      }else{
        this.clientes = [];
      }
    });
  }

  agregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Agregar Cliente',
        component: AgregarComponent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listar();
      }
    });
  }

  editar(id: number): void {
    localStorage.setItem('idCliente', id.toString());
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Editar Cliente',
        component: EditarComponent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listar();
      }
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará permanentemente el registro.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminar(id).subscribe(data => {
          if (data.success) {
            this.listar();
            Swal.fire('Eliminado', data.mensaje, 'success');
          } else {
            Swal.fire('Error', data.mensaje, 'error');
          }
        });
      }
    });
  }

  verMascotas(c: Cliente): void {
    localStorage.setItem('idCliente', c.idCliente.toString());
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: {
        title: 'Cliente ' + c.nombre,
        component: MascotasListar
      }
    });
     dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('idCliente');
      }
    });
  }
}
