import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Respuesta } from '../../Model/Respuesta';
import { Cliente } from '../../Model/Cliente';
import { Mascota } from '../../Model/Mascota';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  http = inject(HttpClient);
  url: string = environment.apiUrl + 'clientes/';
  
  agregar(c: Cliente) {
    return this.http.post<Respuesta>(this.url + 'agregar', c);
  }

  editar(c: Cliente) {
    return this.http.post<Respuesta>(this.url + 'editar', c);
  }

  eliminar(id: number) {
    return this.http.get<Respuesta>(this.url + 'eliminar/' + id);
  }

  listar() {
    return this.http.get<Cliente[]>(this.url + 'listar');
  }

  buscar(id: number) {
    return this.http.get<Cliente>(this.url + 'buscar/' + id);
  }

  buscarMascotas(id: number) {
    return this.http.get<Mascota[]>(this.url + 'buscarMascotas/' + id);
  }
}
