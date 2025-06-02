import { Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { AgregarComponent as AgregarVeterinaria} from './Components/Veterinaria/agregar/agregar.component';
import { EditarComponent as EditarVeterinaria} from './Components/Veterinaria/editar/editar.component';
import { ListarComponent as ListarVeterinaria} from './Components/Veterinaria/listar/listar.component';
import { AgregarComponent as AgregarResponsable} from './Components/Responsables/agregar/agregar.component';
import { EditarComponent as EditarResponsable} from './Components/Responsables/editar/editar.component';
import { ListarComponent as ListarResponsable} from './Components/Responsables/listar/listar.component';
import { AgregarComponent as AgregarMascota} from './Components/Mascotas/agregar/agregar.component';
import { EditarComponent as EditarMascota} from './Components/Mascotas/editar/editar.component';
import { ListarComponent as ListarMascota} from './Components/Mascotas/listar/listar.component';
import { AgregarComponent as AgregarCliente} from './Components/Clientes/agregar/agregar.component';
import { EditarComponent as EditarCliente} from './Components/Clientes/editar/editar.component';
import { ListarComponent as ListarCliente} from './Components/Clientes/listar/listar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'veterinarias/agregar', component: AgregarVeterinaria },
    { path: 'veterinarias/editar', component: EditarVeterinaria },
    { path: 'veterinarias/listar', component: ListarVeterinaria },
    { path: 'responsables/agregar', component: AgregarResponsable },
    { path: 'responsables/editar', component: EditarResponsable },
    { path: 'responsables/listar', component: ListarResponsable },
    { path: 'mascotas/agregar', component: AgregarMascota },
    { path: 'mascotas/editar', component: EditarMascota },
    { path: 'mascotas/listar', component: ListarMascota },
    { path: 'clientes/agregar', component: AgregarCliente },
    { path: 'clientes/editar', component: EditarCliente },
    { path: 'clientes/listar', component: ListarCliente },
];
