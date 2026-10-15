import { Injectable,  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

import { TramiteDiploma, TipoTramite, EstadoTramite } from '../models/diplomas.models';

@Injectable({
  providedIn: 'root'
})
export class DiplomasService {

  private listaDiplomas: TramiteDiploma[] = [
    {
      expediente: 'EXP-2026-001',
      reservista: {
        nombre: 'Juan',
        apellidos: 'García Perez'
      },
      tipoTramite: TipoTramite.nombramiento,
      origen: 'ACTIVO',
      docValida: true,
      estadoActual: EstadoTramite.revisandoDoc,
    },
    {
      expediente: 'EXP-2026-002',
      reservista: {
        nombre: 'María',
        apellidos: 'López Gómez'
      },
      tipoTramite: TipoTramite.ascenso,
      origen: 'ACTIVO',
      docValida: true,
      estadoActual: EstadoTramite.envioCGET,
    },
    {
      expediente: 'EXP-2026-003',
      reservista: {
        nombre: 'Carlos',
        apellidos: 'Martínez Ruíz'
      },
      tipoTramite: TipoTramite.finServicioBaja,
      origen: 'BAJA',
      docValida: true,
      estadoActual: EstadoTramite.recibidoSecrets,
    },
    {
      expediente: 'EXP-2026-004',
      reservista: {
        nombre: 'Ana',
        apellidos: 'Sánchez Fernández'
      },
      tipoTramite: TipoTramite.honorifico,
      origen: 'BAJA',
      docValida: false,
      estadoActual: EstadoTramite.revisandoDoc,
    },    
    {
      expediente: 'EXP-2026-004',
      reservista: {
        nombre: 'David',
        apellidos: 'Navarro Torres'
      },
      tipoTramite: TipoTramite.nombramiento,
      origen: 'BAJA',
      docValida: true,
      estadoActual: EstadoTramite.entregadoConfirmado,
    },       

  ];

  constructor() { }

  // obtener toda la lista de tramites disponibles ( con parametros opcionales)
  obtenerListaTramites(tipo?:TipoTramite, estado?:EstadoTramite): Observable<TramiteDiploma[]> {
    return of(this.listaDiplomas).pipe(
    map(tramites =>
      tramites.filter(tramite =>
        (tipo === undefined || tramite.tipoTramite === tipo) &&
        (estado === undefined || tramite.estadoActual === estado)
      )
    )
  );
  }

  // obtener un tramite especifico por su numero de expediente
  obtenerTramite(expediente:string) {

  }

  // metodo para actualizar los valores de un tramite
  actualizarTramite(tramite:TramiteDiploma) {

  }

  // metodo para insertar un nuevo tramite
  insertarTramite(tramite:TramiteDiploma){

  }

  // metodo para eliminar un tramite
  eliminarTramite(tramite:TramiteDiploma){
  }
}
