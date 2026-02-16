import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { NgIf, NgComponentOutlet } from '@angular/common'; // <- Aquí el héroe del día
import { MatButtonModule } from '@angular/material/button';
import { DialogMediatorService } from '../../../shared/dialog-mediator.service';

@Component({
  selector: 'app-modal-generico',
  standalone: true,
  templateUrl: './modal-generico.component.html',
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgComponentOutlet
  ]
})
export class ModalGenericoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; component: ComponentType<any> },
    private dialogMediator: DialogMediatorService
  ) {
    this.dialogMediator.close$.subscribe(value => {
      this.dialogRef.close(value);
    });
  }
}