import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClienteAPI, EstadoCliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/clientes';

  obtenerListaClientes(): Observable<ClienteAPI[]> {
    return this.http.get<ClienteAPI[]>(this.apiUrl);
  }

  obtenerCliente(id: string): Observable<ClienteAPI> {
    return this.http.get<ClienteAPI>(`${this.apiUrl}/${id}`);
  }

  insertarCliente(cliente: ClienteAPI): Observable<ClienteAPI> {
    return this.http.post<ClienteAPI>(this.apiUrl,cliente);
  }
    
  cambiarEstado(cliente: ClienteAPI, nuevoEstado: EstadoCliente): Observable<ClienteAPI> {
    return this.http.patch<ClienteAPI>(`${this.apiUrl}/${cliente.id}`, {estado: nuevoEstado});
  }

  activarEmpresa(empresa: ClienteAPI): Observable<ClienteAPI> {
    return this.cambiarEstado(empresa, EstadoCliente.Activo);
  }

  desactivarEmpresa(empresa: ClienteAPI): Observable<ClienteAPI> {
    return this.cambiarEstado(empresa, EstadoCliente.Inactivo );
  }

  bajaEmpresa(empresa: ClienteAPI): Observable<ClienteAPI> {
    return this.cambiarEstado(empresa, EstadoCliente.Baja);
  }

  eliminarEmpresa(empresa: ClienteAPI): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${empresa.id}`);
  }



}
