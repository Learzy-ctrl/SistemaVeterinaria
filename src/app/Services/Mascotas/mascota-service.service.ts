import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Mascota } from '../../Model/Mascota';
import { Respuesta } from '../../Model/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class MascotaServiceService {
  http = inject(HttpClient);
    url: string = environment.apiUrl + 'mascotas/';
  
    agregar(m: Mascota) {
      return this.http.post<Respuesta>(this.url + 'agregar', m);
    }
  
    editar(m: Mascota) {
      return this.http.post<Respuesta>(this.url + 'editar', m);
    }
  
    eliminar(id: number) {
      return this.http.get<Respuesta>(this.url + 'eliminar/' + id);
    }
  
    listar() {
      return this.http.get<Mascota[]>(this.url + 'listar');
    }
  
    buscar(id: number) {
      return this.http.get<Mascota>(this.url + 'buscar/' + id);
    }
}
