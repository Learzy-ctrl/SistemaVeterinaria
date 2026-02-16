import { Component } from '@angular/core';
import { Veterinaria } from '../../../Model/Veterinaria';
import { VeterinariaServiceService } from '../../../Services/Veterinarias/veterinaria-service.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../../Shared/modal-generico/modal-generico.component';
import { AgregarComponent } from '../agregar/agregar.component';
import { EditarComponent } from '../editar/editar.component';
import { ListarComponent as ResponsablesListar } from '../../Responsables/listar/listar.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  veterinarias: Veterinaria[] = [];

  constructor(private veterinariaService: VeterinariaServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
  }


  listar(): void {
    this.veterinariaService.listar().subscribe(data => {
      if (data != null) {
        this.veterinarias = data;
      }else{
        this.veterinarias = [];
      }
    });
  }

  agregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Agregar Veterinaria',
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
    localStorage.setItem('idVeterinaria', id.toString());
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        title: 'Editar Veterinaria',
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
        this.veterinariaService.eliminar(id).subscribe(data => {
          if (data.success) {
            this.listar();
            Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
          } else {
            Swal.fire('Error', data.mensaje, 'error');
          }
        });

      }
    });
  }

  verResponsables(vet: Veterinaria): void {
    localStorage.setItem('idVeterinaria', vet.idVeterinaria.toString());
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: {
        title: 'Veterinaria ' + vet.nombre,
        component: ResponsablesListar
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('idVeterinaria');
      }
    });
  }
}
