import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Veterinaria } from '../../../Model/Veterinaria';
import { VeterinariaServiceService } from '../../../Services/Veterinarias/veterinaria-service.service';
import { ResponsableServiceService } from '../../../Services/Responsables/responsable-service.service';
import { Responsable } from '../../../Model/Responsable';
import { DialogMediatorService } from '../../../shared/dialog-mediator.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  id!: number;
  responsable!:Responsable;
  responsableForm: FormGroup;
  veterinarias: Veterinaria[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private responsableService: ResponsableServiceService, private veterinariaService: VeterinariaServiceService, private dialogMediator: DialogMediatorService) {
    this.responsableForm = this.fb.group({
      idResponsable: ['', [Validators.required, Validators.min(1)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      contacto: ['', Validators.required],
      veterinariaId: ['', Validators.required]
    });

    this.responsableForm.get('idResponsable')?.disable();
  }

  ngOnInit(): void {
    this.obtenerVeterinarias();
    this.obtenerResponsable();
  }

  get f() {
    return this.responsableForm.controls;
  }
  obtenerVeterinarias(): void {
    this.veterinariaService.listar().subscribe(data => {
      if (data != null) {
        this.veterinarias = data;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las veterinarias',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  obtenerResponsable(): void {
    var id = Number(localStorage.getItem('idResponsable'));
    this.responsableService.buscar(id).subscribe(data => {
      this.responsableForm.patchValue({
        idResponsable: data.idResponsable,
        nombre: data.nombre,
        contacto: data.contacto,
        veterinariaId: data.veterinariaId
      });
      this.id = data.idResponsable;
      localStorage.removeItem('idResponsable');
    })
  }

  onSubmit(): void {
    if (this.responsableForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.responsable = this.responsableForm.value;
    this.responsable.idResponsable = this.id;
        this.responsableService.editar(this.responsable).subscribe(data => {
          this.isLoading = false;
          if (data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: data.mensaje,
              confirmButtonColor: '#198754'
            });
            this.dialogMediator.closeDialog(true);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.mensaje,
              confirmButtonColor: '#dc3545'
            });
          }
        });
  }

  private markAllAsTouched(): void {
    Object.values(this.responsableForm.controls).forEach(control => control.markAsTouched());
    Swal.fire({
      icon: 'warning',
      title: 'Formulario inválido',
      text: 'Por favor revisa los campos marcados',
      confirmButtonColor: '#ffc107'
    });
  }
}
