/*
lista-cliente-2.componente : Reutilizacion de lista-cliente para aplicar el uso de Servicios
- Objetivo:
- Introduccion a los servicios de Angular para encapsular la gestión de datos
- Implementar un servicio basico y su uso desde el componente
*/
import { Component, output, inject } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Empresa,EstadoCliente } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-lista-cliente-2',
  imports: [NgClass, FormsModule, UpperCasePipe],
  templateUrl: './lista-cliente-2.component.html',
  styleUrl: './lista-cliente-2.component.css'
})
export class ListaCliente2Component {

    public readonly estadoCliente = EstadoCliente; // Para poder usar el enumerado en la plantilla HTML
   
    // Gestion de comunicacion con el padre -> 
    // @Output() empresaSeleccionada: Empresa | null = null;  // version tradicional
    outEmpresaSeleccionada = output<Empresa>();
    
    //#region - variables internas del componente
    filtrarBajas: boolean = false;
    empresaSeleccionada: Empresa | null = null
    listaEmpresas: Empresa[] = [];    
    //#endregion

    //#region - inyección del servicio
    // tradicional
    //constructor(public clienteService: ClienteService) {}
  
    // recomendada en las ultimas versiones
    private servicioCientes = inject(ClientesService);
    //#endregion

    //empresaSeleccionada: Empresa | null = null;

  
    ngOnInit(): void {
      this.getListaEmpresas();
    }
  
    // obtiene la lista empresa y selecciona opcionalmente la que tenga el codigo pasado como parametro
    getListaEmpresas(codigoSeleccionado?:string){
      this.listaEmpresas = this.servicioCientes.obtenerListaClientes();
      if (this.listaEmpresas.length > 0) { 
        // podemos usar el parametro opcional para seleccionar directamente ese cliente
        if (codigoSeleccionado) {
          let index:number = this.listaEmpresas.findIndex( (cl) => cl.codigo == codigoSeleccionado );      
            if (index >=0 ) {
              this.seleccionarEmpresa(this.listaEmpresas[index]); // Selecciona la primera empresa por defecto 
            }            
        }
        else {
          this.seleccionarEmpresa(this.listaEmpresas[0]); // Selecciona la primera empresa por defecto 
        }
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

    desactivarEmpresa(empresa: Empresa): void {
      this.servicioCientes.desactivarEmpresa(empresa);
    }    

    activarEmpresa(empresa: Empresa): void {
      this.servicioCientes.activarEmpresa(empresa);
    }    

    bajaEmpresa(empresa: Empresa): void {      
      this.servicioCientes.bajaEmpresa(empresa);
    }

    cambiarEstado(empresa:Empresa, newEstado:EstadoCliente): void {
      this.servicioCientes.cambiarEstado(empresa,newEstado);
    }

    eliminarEmpresa(empresa: Empresa): void { 
      if (confirm(`¿Eliminar la empresa ${empresa.nombre}?`)) {
        this.servicioCientes.eliminarEmpresa(empresa);
      }     
    }    

}
