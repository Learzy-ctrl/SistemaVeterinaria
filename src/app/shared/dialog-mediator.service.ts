import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogMediatorService {
  private closeSubject = new Subject<any>();
  close$ = this.closeSubject.asObservable();

  closeDialog(data: any = true): void {
    this.closeSubject.next(data);
  }
}
