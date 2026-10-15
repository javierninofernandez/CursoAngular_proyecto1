/* 
La ficha recibe la persona y el modo desde el padre. Cuando se pulsa guardar, envía al padre tanto la persona como el tipo de operación.

los botones se pulsan desde la ficha, pero las operaciones se coordinan desde el padre
La ficha emitirá cuatro eventos:
- outEditar: solicita entrar en modo edición.
- outInsertar: solicita iniciar una nueva persona.
- outGuardarPersona: devuelve los datos al confirmar.
- outCancelar: solicita cancelar la operación.
*/

import { Component,inject, input, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Persona } from '../../ejemplo-comunicacion.models';

@Component({
  selector: 'app-ficha-ejemplo',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './ficha-ejemplo.component.html',
  styleUrl: './ficha-ejemplo.component.css'
})
export class FichaEjemploComponent {

  // PADRE -> FICHA
  inPersona = input<Persona | null>(null);
  inModo = input<'ver' | 'editar' | 'nuevo'>('ver');

  // FICHA -> PADRE
  outGuardarPersona = output<{
    tipo: 'insertar' | 'editar';
    persona: Persona;
  }>();

  outEditar = output<void>();
  outInsertar = output<void>();
  outCancelar = output<void>();


  //#region - Formulario Reactivo 
  
  // inyeccion para el uso de FormBuilder
  private fb = inject(FormBuilder);

  // definicion del formulario
  personaForm: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    nombre: ['', Validators.required],
    edad: ['', Validators.required],
    nacionalidad: [''],
    nif: ['']
    //estado: ['', Validators.required],
  });

  get f() {
    return this.personaForm.controls;
  }

  //#endregion

  constructor() {
    effect(() => {
      const persona = this.inPersona();
      const modo = this.inModo();

      this.personaForm.reset({
        id: persona?.id ?? null,
        nombre: persona?.nombre ?? '',
        edad: persona?.edad ?? null,
        nacionalidad: persona?.nacionalidad ?? '',
        nif: persona?.nif ?? ''
      }, { emitEvent: false });

      if (modo === 'ver') {
        this.personaForm.disable();
      } else {
        this.personaForm.enable();
        this.personaForm.controls['id'].disable();
      }
    });
  }  


  //#region - botones
  btnConfirmar(){
    if (this.personaForm.invalid) {
      this.personaForm.markAllAsTouched();
      return;
    }
    const persona: Persona = this.personaForm.getRawValue();
    const tipo = this.inModo() === 'nuevo' ? 'insertar' : 'editar';
    this.outGuardarPersona.emit({tipo, persona});
  }

  btnCancelar(){
    this.outCancelar.emit();    
  }

  btnEditar(){
    this.outEditar.emit();
  }

  
  btnInsertar(): void {
    this.outInsertar.emit();    
  }
  
  //#emdregion - botones

}
