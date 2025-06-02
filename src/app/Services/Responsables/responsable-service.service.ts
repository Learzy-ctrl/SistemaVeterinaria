import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Responsable } from '../../Model/Responsable';
import { Mascota } from '../../Model/Mascota';
import { Respuesta } from '../../Model/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class ResponsableServiceService {
  http = inject(HttpClient);
  url: string = environment.apiUrl + 'responsables/';

  agregar(r: Responsable) {
    return this.http.post<Respuesta>(this.url + 'agregar', r);
  }

  editar(r: Responsable) {
    return this.http.post<Respuesta>(this.url + 'editar', r);
  }

  eliminar(id: number) {
    return this.http.get<Respuesta>(this.url + 'eliminar/' + id);
  }

  listar() {
    return this.http.get<Responsable[]>(this.url + 'listar');
  }

  buscar(id: number) {
    return this.http.get<Responsable>(this.url + 'buscar/' + id);
  }

  buscarMascotas(id: number) {
    return this.http.get<Mascota[]>(this.url + 'buscarMascotas/' + id);
  }
}
