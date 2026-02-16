import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Mascota } from '../../../Model/Mascota';
import { MascotaServiceService } from '../../../Services/Mascotas/mascota-service.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../../Shared/modal-generico/modal-generico.component';
import { EditarComponent } from '../../Mascotas/editar/editar.component';
import { AgregarComponent } from '../agregar/agregar.component';
import { ResponsableServiceService } from '../../../Services/Responsables/responsable-service.service';
import { ClienteServiceService } from '../../../Services/Clientes/cliente-service.service';
import { DialogMediatorService } from '../../../shared/dialog-mediator.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  idResponsable: number = 0;
  idCliente: number = 0;
  showTools: boolean = true;
  mascotas: Mascota[] = [];

  constructor(private mascotaService: MascotaServiceService, private responsableService: ResponsableServiceService, private clienteService: ClienteServiceService, private dialog: MatDialog, private dialogMediator: DialogMediatorService) { }

  ngOnInit(): void {
    const idStringR = localStorage.getItem('idResponsable');
    this.idResponsable = idStringR && !isNaN(+idStringR) ? Number(idStringR) : 0;

    const idStringC = localStorage.getItem('idCliente');
    this.idCliente = idStringC && !isNaN(+idStringC) ? Number(idStringC) : 0;
    this.listar();
  }

  listar(): void {
    if (this.idResponsable > 0) {
      this.responsableService.buscarMascotas(this.idResponsable).subscribe(data => {
        if (data != null) {
          this.mascotas = data;
        }else{
          this.mascotas = [];
        }
      });
      this.showTools = false;
    } else if (this.idCliente > 0) {
      this.clienteService.buscarMascotas(this.idCliente).subscribe(data => {
        if (data != null) {
          this.mascotas = data;
        }else{
          this.mascotas = [];
        }
      });
      this.showTools = false;
    } else {
      this.mascotaService.listar().subscribe(data => {
        if (data != null) {
          this.mascotas = data;
        }else{
          this.mascotas = [];
        }
      });
    }

  }

  agregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Agregar Mascota',
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
    localStorage.setItem('idMascota', id.toString());
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Editar Mascota',
        component: EditarComponent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listar();
      }
    });
  }

  cerrar(): void {
    this.dialogMediator.closeDialog();
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
        this.mascotaService.eliminar(id).subscribe(data => {
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
}
