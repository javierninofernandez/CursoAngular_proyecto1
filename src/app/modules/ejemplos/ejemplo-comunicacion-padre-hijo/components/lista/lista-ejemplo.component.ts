/* 
Al seleccionar una fila, se emite outPersonaSeleccionada. El padre recibe la persona y actualiza su señal personaSeleccionada, que a su vez alimenta la ficha. 
La lista recibe los datos con input() y comunica la selección con output().
*/

import { Component, output, input, effect } from '@angular/core';
import { TableModule } from 'primeng/table';  // importamos componente table de primeNG
import { Persona } from '../../ejemplo-comunicacion.models';

@Component({
  selector: 'app-lista-ejemplo',
  imports: [TableModule],
  templateUrl: './lista-ejemplo.component.html',
  styleUrl: './lista-ejemplo.component.css'
})

export class ListaEjemploComponent {
  
  primeraCargaRealizada: boolean = false;

   // PADRE -> LISTA
  listaPersonas = input<Persona[]>([]);

  // LISTA -> PADRE
  outPersonaSeleccionada = output<Persona>();

  personaSeleccionada: Persona | null = null;

  constructor() {
    // Seleccionar la primera persona cuando llegue la lista inicial.
    effect(() => {
      const personas = this.listaPersonas();
      if (personas.length > 0 && this.personaSeleccionada === null) {
        this.seleccionarPersona(personas[0]);
      }
    });
  }

  seleccionarPersona(persona: Persona): void {
    console.log('Persona seleccionada:', persona);
    this.personaSeleccionada = persona;
    this.outPersonaSeleccionada.emit(persona);
  }

  // ngOnInit(): void {
  //   if (this.listaPersonas().length > 0) { 
  //       this.seleccionarPersona(this.listaPersonas()[0]); // Selecciona la primera empresa por defecto 
  //   }
  //   this.primeraCargaRealizada = true;
  // }
    

  alSeleccionarFila(evento: any) {
    this.seleccionarPersona(evento);
  }

    //#endregion

}
