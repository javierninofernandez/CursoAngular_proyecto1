import { Injectable  } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
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
  // of(this.listaDiplomas): convierte la lista en un Observable.
  // pipe(...): permite aplicar operadores de RxJS.
  // map(...): transforma el contenido emitido.
  // filter(...): filtra los trámites según las condiciones indicadas.    
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
  obtenerTramite(expediente:string): Observable<TramiteDiploma | undefined> {
    const usuario = this.listaDiplomas.find(u => u.expediente === expediente);
    return of(usuario).pipe(
      delay(500)
    );    

  }

  // metodo para actualizar los valores de un tramite
  actualizarTramite(tramite:TramiteDiploma) {
    const indice = this.listaDiplomas.findIndex( t => t.expediente === tramite.expediente );
    if (indice === -1) {
      return of(undefined);
    }
    this.listaDiplomas[indice] = { ...tramite };
    return of(this.listaDiplomas[indice]).pipe(
      delay(500)
    );
  }

  actualizarEstadoTramite(tramite:TramiteDiploma, newEstado: EstadoTramite): Observable<TramiteDiploma | undefined> {
    const indice = this.listaDiplomas.findIndex( t => t.expediente === tramite.expediente );
    if (indice === -1) {
      return of(undefined);
    }
    this.listaDiplomas[indice].estadoActual = newEstado;
    return of(this.listaDiplomas[indice]).pipe(
      delay(500)
    );
  }

  // metodo para insertar un nuevo tramite
  insertarTramite(tramite:TramiteDiploma){

  }

  // metodo para eliminar un tramite
  eliminarTramite(tramite:TramiteDiploma){
  }
}
