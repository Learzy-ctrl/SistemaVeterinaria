import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Responsable } from '../../../Model/Responsable';
import { Cliente } from '../../../Model/Cliente';
import { MascotaServiceService } from '../../../Services/Mascotas/mascota-service.service';
import { ResponsableServiceService } from '../../../Services/Responsables/responsable-service.service';
import { ClienteServiceService } from '../../../Services/Clientes/cliente-service.service';
import { Mascota } from '../../../Model/Mascota';
import { DialogMediatorService } from '../../../shared/dialog-mediator.service';
@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  mascota!: Mascota;
  mascotaForm: FormGroup;
  responsables: Responsable[] = [];
  clientes: Cliente[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private mascotaService: MascotaServiceService, private responsableService: ResponsableServiceService, private clienteService: ClienteServiceService, private dialogMediator: DialogMediatorService) {
    this.mascotaForm = this.fb.group({
      idMascota: ['', [Validators.required, Validators.min(1)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      razonCita: ['', Validators.required],
      clienteId: ['', Validators.required],
      responsableId: ['', Validators.required],
      veterinariaId: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerResponsables();
    this.obtenerClientes();
  }

  get f() {
    return this.mascotaForm.controls;
  }

  obtenerResponsables(): void {
    this.responsableService.listar().subscribe(data => {
      this.responsables = data || [];
    });
  }

  obtenerClientes(): void {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data || [];
    });
  }

  onSubmit(): void {
    if (this.mascotaForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.mascota = this.mascotaForm.value;
    this.responsables.forEach(responsable => {
      if (responsable.idResponsable === this.mascota.responsableId) {
        this.mascota.veterinariaId = responsable.veterinariaId;
      }
    });
    this.mascotaService.agregar(this.mascota).subscribe(data => {
      this.isLoading = false;
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: data.mensaje,
          confirmButtonColor: '#198754'
        })
        this.dialogMediator.closeDialog(true);
      } else {
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
    Object.values(this.mascotaForm.controls).forEach(control => control.markAsTouched());
    Swal.fire({
      icon: 'warning',
      title: 'Formulario inválido',
      text: 'Por favor revisa los campos marcados',
      confirmButtonColor: '#ffc107'
    });
  }
}
