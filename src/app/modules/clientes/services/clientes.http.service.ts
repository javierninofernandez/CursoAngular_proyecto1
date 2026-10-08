import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EmpresaAPI, EstadoCliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesServiceHttp {

  // inyectar HttpClient para poder usarlo en las llamadas al API
  private readonly http = inject(HttpClient);

  // propiedad/constante interna Para facilitarno la referencia a la URL base de las APIs
  private readonly apiUrl = 'http://localhost:3000/clientes';


  //#region - metodos implementados

  obtenerListaClientes(): Observable<EmpresaAPI[]> {
    return this.http.get<EmpresaAPI[]>(this.apiUrl);
  }

  obtenerCliente(id: string): Observable<EmpresaAPI> {
    return this.http.get<EmpresaAPI>(`${this.apiUrl}/${id}`);
  }

  insertarCliente(cliente: EmpresaAPI): Observable<EmpresaAPI> {
    return this.http.post<EmpresaAPI>(this.apiUrl,cliente);
  }
   
  actualizarCliente(cliente: EmpresaAPI): Observable<EmpresaAPI> {
    //return this.http.patch<EmpresaAPI>(`${this.apiUrl}/${cliente.id}`, { cliente });
     return this.http.put<EmpresaAPI>(`${this.apiUrl}/${cliente.id}`, cliente );
  }

  cambiarEstado(cliente: EmpresaAPI, nuevoEstado: EstadoCliente): Observable<EmpresaAPI> {
    return this.http.patch<EmpresaAPI>(`${this.apiUrl}/${cliente.id}`, {estado: nuevoEstado});
  }

  activarEmpresa(empresa: EmpresaAPI): Observable<EmpresaAPI> {
    return this.cambiarEstado(empresa, EstadoCliente.Activo);
  }

  desactivarEmpresa(empresa: EmpresaAPI): Observable<EmpresaAPI> {
    return this.cambiarEstado(empresa, EstadoCliente.Inactivo );
  }

  bajaEmpresa(empresa: EmpresaAPI): Observable<EmpresaAPI> {
    return this.cambiarEstado(empresa, EstadoCliente.Baja);
  }

  eliminarEmpresa(empresa: EmpresaAPI): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${empresa.id}`);
  }

  //#endregion 

}
