import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ClienteServiceService } from '../../../Services/Clientes/cliente-service.service';
import { Cliente } from '../../../Model/Cliente';
import { DialogMediatorService } from '../../../shared/dialog-mediator.service';
@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  cliente!: Cliente;
  clienteForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private clienteService: ClienteServiceService, private dialogMediator: DialogMediatorService) {
    this.clienteForm = this.fb.group({
      idCliente: ['', [Validators.required, Validators.min(1)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', Validators.required],
      contacto: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  get f() {
    return this.clienteForm.controls;
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.cliente = this.clienteForm.value;
    this.clienteService.agregar(this.cliente).subscribe(data => {
      this.isLoading = false;
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: data.mensaje,
          confirmButtonColor: '#198754'
        });
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
    Object.values(this.clienteForm.controls).forEach(control => control.markAsTouched());
    Swal.fire({
      icon: 'warning',
      title: 'Formulario inválido',
      text: 'Por favor revisa los campos marcados',
      confirmButtonColor: '#ffc107'
    });
  }
}
