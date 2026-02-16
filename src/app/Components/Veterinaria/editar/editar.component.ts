import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { VeterinariaServiceService } from '../../../Services/Veterinarias/veterinaria-service.service';
import { Veterinaria } from '../../../Model/Veterinaria';
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
  veterinaria!: Veterinaria;
  veterinariaForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private veterinariaService: VeterinariaServiceService, private dialogMediator: DialogMediatorService) {
    this.veterinariaForm = this.fb.group({
      idVeterinaria: ['', [Validators.required, Validators.min(1)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
    this.veterinariaForm.get('idVeterinaria')?.disable();
  }

  get f() {
    return this.veterinariaForm.controls;
  }

  ngOnInit(): void {
    this.obtenerVeterinaria();
  }

  obtenerVeterinaria(): void {
    var id = localStorage.getItem('idVeterinaria');
    this.veterinariaService.buscar(Number(id)).subscribe(data => {
      this.veterinariaForm.patchValue({
        idVeterinaria: data.idVeterinaria,
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono
      });
      this.id = data.idVeterinaria;
    });
    localStorage.removeItem('idVeterinaria');
  }

  onSubmit(): void {
    if (this.veterinariaForm.invalid) {
      this.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    this.veterinaria = this.veterinariaForm.value;
    this.veterinaria.idVeterinaria = this.id;
    this.veterinariaService.editar(this.veterinaria).subscribe(data => {
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
    Object.values(this.veterinariaForm.controls).forEach(control => control.markAsTouched());
    Swal.fire({
      icon: 'warning',
      title: 'Formulario inválido',
      text: 'Por favor revisa los campos marcados',
      confirmButtonColor: '#ffc107'
    });
  }
}
