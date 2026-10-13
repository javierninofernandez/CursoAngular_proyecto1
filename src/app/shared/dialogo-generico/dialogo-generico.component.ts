/* 
componente generico para mostrar ventanas dialog de confirmación, avisos, etc
Basado en la utilización de dialog de primeNG
servicio -> Usamos para facilitar su uso desde cualquier componente de la aplicación sin incluir el componente en el html
models -> fichero para definir las interfaces que utiliza
*/
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogoConfig, AccionDialogo } from './dialogo.models'


@Component({
  selector: 'app-dialog-generico',
  imports: [
    CommonModule, 
    ButtonModule
  ],
  templateUrl: './dialogo-generico.component.html',
  styleUrl: './dialogo-generico.component.css'
})
export class DialogoGenericoComponent {
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);

  datos: DialogoConfig = this.config.data as DialogoConfig;

  get mostrarAceptar(): boolean {
    return ['CONSULTA', 'CONFIRMACION'].includes(this.datos.tipo);
  }

  get mostrarCancelar(): boolean {
    return ['CONSULTA', 'CONFIRMACION'].includes(this.datos.tipo);
  }

  get mostrarOk(): boolean {
    return ['INFO', 'ERROR'].includes(this.datos.tipo);
  }

  ejecutar(accion: AccionDialogo): void {
    this.ref.close(accion);
  }
}