import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Responsable } from '../../../Model/Responsable';
import { ResponsableServiceService } from '../../../Services/Responsables/responsable-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../../Shared/modal-generico/modal-generico.component';
import { AgregarComponent } from '../agregar/agregar.component';
import { EditarComponent } from '../editar/editar.component';
import { ListarComponent as MascotasListar } from '../../Mascotas/listar/listar.component';
import Swal from 'sweetalert2';
import { VeterinariaServiceService } from '../../../Services/Veterinarias/veterinaria-service.service';
import { DialogMediatorService } from '../../../shared/dialog-mediator.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  isFromVeterinaria: boolean = true;
  idVeterinaria: number = 0;
  responsables: Responsable[] = [];

  constructor(private responsableService: ResponsableServiceService, private veterinariaService: VeterinariaServiceService, private dialog: MatDialog, private dialogMediator: DialogMediatorService) { }

  ngOnInit(): void {
    const idString = localStorage.getItem('idVeterinaria');
    this.idVeterinaria = idString && !isNaN(+idString) ? Number(idString) : 0;
    this.listar();
  }


  listar(): void {
    if (this.idVeterinaria == 0) {
      this.responsableService.listar().subscribe(data => {
        if (data != null) {
          this.responsables = data;
        }else{
          this.responsables = [];
        }
      });
    } else {
      this.veterinariaService.buscarResponsables(this.idVeterinaria).subscribe(data => {
        if (data != null) {
          this.responsables = data;
        }else{
          this.responsables = [];
        }
      });
      this.isFromVeterinaria = false;
    }
  }

  agregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Agregar Responsable',
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
    localStorage.setItem('idResponsable', id.toString());
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Editar Responsable',
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
        this.responsableService.eliminar(id).subscribe(data => {
          if (data.success) {
            this.listar();
            Swal.fire('Eliminado', data.mensaje, 'success');
          } else {
            Swal.fire('Error', data.mensaje, 'error');
          }
        })
      }
    });
  }

  cerrar(): void {
    this.dialogMediator.closeDialog();
  }


  verMascotas(res: Responsable): void {
    localStorage.setItem('idResponsable', res.idResponsable.toString());
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: {
        title: 'Responsable ' + res.nombre,
        component: MascotasListar
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('idResponsable');
      }
    });
  }
}
