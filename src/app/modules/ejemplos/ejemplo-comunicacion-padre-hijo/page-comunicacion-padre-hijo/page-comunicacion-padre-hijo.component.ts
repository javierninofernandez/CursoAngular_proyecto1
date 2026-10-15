/*
OPERATIVA
- Seleccionar una persona: la lista emite la persona al padre; el padre se la pasa a la ficha.
- Insertar una persona: la ficha emite la nueva persona al padre; el padre ordena a la lista que la añada.
- Editar una persona: la ficha emite la persona modificada al padre; el padre actualiza la lista.

Esquema comunicació mediante los enlaces de Angular:
- [personas] pasa la lista del padre al hijo.
- (outPersonaSeleccionada) recibe la selección de la lista.
- [inPersona] pasa la persona seleccionada a la ficha.
- (outGuardarPersona) recibe del hijo ficha la operación que debe realizar el padre.

NOTA: 
El padre modifica listaPersonas. 
Al hacerlo, Angular actualiza automáticamente el input de la lista. 
No necesitas emitir un evento adicional para ordenar a la lista que inserte o actualice una persona.
*/
import { Component,input,output, signal } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

import { Persona } from '../ejemplo-comunicacion.models';
import { ListaEjemploComponent } from "../components/lista/lista-ejemplo.component";
import { FichaEjemploComponent } from "../components/ficha/ficha-ejemplo.component";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: 'app-page-comunicacion-padre-hijo',
  imports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    ListaEjemploComponent,
    FichaEjemploComponent,
    UpperCasePipe
  ],
  templateUrl: './page-comunicacion-padre-hijo.component.html',
  styleUrl: './page-comunicacion-padre-hijo.component.css'
})

export class PageComunicacionPadreHijoComponent {

  // Datos de personas centralizados en el padre
  listaPersonas = signal<Persona[]>([
    { id: 1, nombre: 'Empresa 1', edad: 16, nacionalidad: '', nif: '2678984-A' },
    { id: 2, nombre: 'Empresa 2', edad: 25, nacionalidad: '', nif: '2678984-B' },
    { id: 3, nombre: 'Empresa 3', edad: 40, nacionalidad: '', nif: '2678984-C' },
    { id: 4, nombre: 'Empresa 4', edad: 70, nacionalidad: '', nif: '2678984-D' }
  ]);  

  // Persona que se muestra en la ficha
  personaSeleccionada = signal<Persona | null>(null);

  // Modo de funcionamiento de la ficha
  modoFicha = signal<'ver' | 'editar' | 'nuevo'>('ver');
  
  // LISTA -> PADRE
  alSeleccionarPersona(persona: Persona): void {
    this.personaSeleccionada.set({ ...persona });
    this.modoFicha.set('ver');
  }

  // FICHA -> PADRE -> LISTA
  alGuardarPersona(evento: {tipo: 'insertar' | 'editar'; persona: Persona;}): void {

    if (evento.tipo === 'insertar') {
      const ids = this.listaPersonas().map(p => p.id ?? 0);
      const nuevoId = Math.max(0, ...ids) + 1;
      const nuevaPersona: Persona = { ...evento.persona, id: nuevoId };

      this.listaPersonas.update(lista => [...lista,nuevaPersona]);
      this.personaSeleccionada.set({ ...nuevaPersona });

    } else {
      this.listaPersonas.update(lista => lista.map(p => p.id === evento.persona.id ? { ...evento.persona }: p));
      this.personaSeleccionada.set({ ...evento.persona });
    }

    // Después de guardar, mostrar la persona en modo consulta
    this.modoFicha.set('ver');
  }  


  // Botón para iniciar una inserción
  nuevaPersona(): void {
    this.personaSeleccionada.set(null);
    this.modoFicha.set('nuevo');
  }

  // Entrar en modo edición
  editarPersona(): void {
    if (this.personaSeleccionada()) { this.modoFicha.set('editar');}
  }

  cancelarEdicion(): void {
   this.modoFicha.set('ver');
  }

  
}

