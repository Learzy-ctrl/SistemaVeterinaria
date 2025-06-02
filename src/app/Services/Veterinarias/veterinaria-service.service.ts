import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Veterinaria } from '../../Model/Veterinaria';
import { Responsable } from '../../Model/Responsable';
import { Respuesta } from '../../Model/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class VeterinariaServiceService {

  http = inject(HttpClient);
  url: string = environment.apiUrl + 'veterinarias/';

  agregar(v:Veterinaria){
    return this.http.post<Respuesta>(this.url + 'agregar', v);
  }

  editar(v:Veterinaria){
    return this.http.post<Respuesta>(this.url + 'editar', v);
  }

  eliminar(id: number){
    return this.http.get<Respuesta>(this.url + 'eliminar/' + id);
  }

  listar(){
    return this.http.get<Veterinaria[]>(this.url + 'listar');
  }

  buscar(id: number){
    return this.http.get<Veterinaria>(this.url + 'buscar/' + id);
  }

  buscarResponsables(id: number){
    return this.http.get<Responsable[]>(this.url + 'buscarResponsables/' + id);
  }
}
