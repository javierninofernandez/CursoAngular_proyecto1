/*
lista-cliente.componente : Ejemplo de lista empresas gestionadas directamente en un array 
- Objetivo:
- Creacion del componente a traves de plantillas html y css
- Aplicar el uso de las principales directivas angular @for, @if, @switch, [ngModel], [ngClass]
- Introduccion al paso de parametros componente padre con output / @Output
- Gestion de eventos (click)="metodoGEstion($event, parametrosAdicionales); opcional $event.stopPropagation()""
- Depuracion: console.log / console.table + depuracion con VsCode
*/

import { Component, output } from '@angular/core';
import { Empresa, EstadoCliente } from '../../models/cliente.model';
import { NgClass, NgTemplateOutlet, UpperCasePipe } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-cliente',
  imports: [NgClass, UpperCasePipe, FormsModule, NgTemplateOutlet],
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.css'
})
export class ListaClienteComponent {
    
    public readonly estadoCliente = EstadoCliente; // Para poder usar el enumerado en la plantilla HTML

    //TODO
    //* importante
    //? Cosas que revisar
    
    // Gestion de comunicacion con el padre -> 
    // @Output() empresaSeleccionada: Empresa | null = null;  // version tradicional
    outEmpresaSeleccionada = output<Empresa>();

    //#region - declaracion de variables internas del componente
    filtrarBajas: boolean = false;
    empresaSeleccionada: Empresa | null = null

    listaEmpresas: Empresa[] = [
          { codigo: 'COD-260001',
            nombre: 'Empresa 1',
            nif: '2678984-A',
            estado: EstadoCliente.Activo,
            direccion: {
              calle: 'los olmos',
              numero: 24,
              provincia: 'Madrid'
            }
          },
          { codigo: 'COD-260002',
            nombre: 'Empresa 2',
            nif: '2678984-B',
            estado: EstadoCliente.Activo,
            direccion: {
              calle: 'Gran via',
              numero: 54,
              provincia: 'Madrid'
            }
          },
          { codigo: 'COD-260003',
            nombre: 'Empresa 3',
            nif: '2678984-C',
            estado: EstadoCliente.Baja,
            direccion: {
              calle: 'Serrano',
              numero: 14,
              provincia: 'Madrid'
            }
          },
          { codigo: 'COD-260004',
            nombre: 'Empresa 4',
            nif: '2678984-D',
            estado: EstadoCliente.Inactivo,
            direccion: {
              calle: 'San Bernardo',
              numero: 84,
              provincia: 'Madrid'
            }
          },
          { codigo: 'COD-ELIMINAR',
            nombre: 'Empresa Eliminar',
            nif: '11111111-D',
            estado: EstadoCliente.Baja,
            direccion: {
              calle: 'Goya',
              numero: 84,
              provincia: 'Madrid'
            }
          }          
      ];
    
    //#endregion 


    ngOnInit(): void {
      if (this.listaEmpresas.length > 0) { 
         this.seleccionarEmpresa(this.listaEmpresas[0]); // Selecciona la primera empresa por defecto 
      }
    }
    
    seleccionarEmpresa(empresa: Empresa) {
      // ejemplo de console.log / console.table /alert
      console.log('Empresa seleccionda:',empresa);      // Muestra la informacion de la lista de clientes en la consola
      console.table(empresa);                           // Muestra la lista clientes en la consola en formato de tabla
      console.table(empresa, ['codigo','nombre']);      // Filtrar: Muestra solo las columnas 'codigo','nombre' de la tabla      
      // seleccion de empresa
      this.empresaSeleccionada = empresa;
      this.outEmpresaSeleccionada.emit(empresa);
    }


    //#region - gestion de botones    

    desactivarEmpresa(empresa: Empresa): void {
      // Lógica para cambiar el estado a Baja
      console.log('Dar de baja:', empresa);
      this.cambiarEstado(empresa,this.estadoCliente.Inactivo);
    }    

    activarEmpresa(empresa: Empresa): void {
      // Lógica para cambiar el estado a Baja
      console.log('Dar de baja:', empresa);
      this.cambiarEstado(empresa,this.estadoCliente.Activo);
    }    

    bajaEmpresa(empresa: Empresa): void {      
      console.log('Dar de baja:', empresa);   
      // Lógica para cambiar el estado a Baja
      this.cambiarEstado(empresa,this.estadoCliente.Baja);
    }

    cambiarEstado(empresa:Empresa, newEstado:EstadoCliente): void {
      let index:number = this.listaEmpresas.findIndex( (cl) => cl.codigo == empresa.codigo );      
      if (index >=0 ) {
        console.log('CAMBIO ESTADO: Estado Anterior:'+this.listaEmpresas[index].estado+' -> Nuevo Estado:'+newEstado);
        this.listaEmpresas[index].estado = newEstado;
      }
    }

    eliminarEmpresa(empresa: Empresa): void {      
      alert('Eliminar Empresa'); 
      confirm('Desea eliminar')     
      // Lógica para eliminar      
      let index:number = this.listaEmpresas.findIndex( (cl) => cl.codigo == empresa.codigo );      
      if (index >=0 ) {
        console.log('Eliminar:', empresa);
        this.listaEmpresas.splice(index,1);
      }      
    }    

    //#endregion

}
