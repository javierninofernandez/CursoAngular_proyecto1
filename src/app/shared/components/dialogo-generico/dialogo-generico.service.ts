import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogoGenericoComponent } from './dialogo-generico.component';
import { DialogoConfig, AccionDialogo} from './dialogo.models';

@Injectable({
  providedIn: 'root'
})
export class DialogoService {

  private dialogService = inject(DialogService);


  // metodo general para abrir el modal y retornar el valor
  abrir(config: DialogoConfig): Observable<AccionDialogo> {

    const ref = this.dialogService.open(
      DialogoGenericoComponent,
      {
        header: config.titulo,
        width: config.ancho || '420px',
        modal: true,
        closable: true,
        draggable: false,
        data: config
      }
    );

    return ref.onClose.pipe(
      take(1),
      map((resultado: AccionDialogo | undefined) =>
        resultado ?? 'CANCELAR'
      )
    );
  }


  // Metodos especificos

  info(titulo: string, mensaje: string):
    Observable<AccionDialogo> {

    return this.abrir({
      titulo,
      mensaje,
      tipo: 'INFO'
    });
  }

  error(titulo: string, mensaje: string):
    Observable<AccionDialogo> {

    return this.abrir({
      titulo,
      mensaje,
      tipo: 'ERROR'
    });
  }

  confirmar(titulo: string, mensaje: string):
    Observable<AccionDialogo> {

    return this.abrir({
      titulo,
      mensaje,
      tipo: 'CONFIRMACION'
    });
  }

  consultar(titulo: string, mensaje: string):
    Observable<AccionDialogo> {

    return this.abrir({
      titulo,
      mensaje,
      tipo: 'CONSULTA'
    });
  }

}