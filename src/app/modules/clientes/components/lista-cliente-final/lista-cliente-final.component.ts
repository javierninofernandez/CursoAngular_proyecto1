/*
lista-cliente-final.componente : version final con servicio de API 
- Objetivo:
- Cambio para uso de servicios con API (observables)
- Gestion de parametros de entrada y salida
*/
import { Component, output, input, inject } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';


import { ClienteAPI,EstadoCliente } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.http.service'


@Component({
  selector: 'app-lista-cliente-final',
  imports: [NgClass],
  templateUrl: './lista-cliente-final.component.html',
  styleUrl: './lista-cliente-final.component.css'
})
export class ListaClienteFinalComponent {

    public readonly estadoCliente = EstadoCliente; // Para poder usar el enumerado en la plantilla HTML
   
    // Gestion de comunicacion con el padre -> 
    filtrarBajas = input<boolean>(false);              // verion tradicional @Input() filtrarBajas: boolean = false;
    outEmpresaSeleccionada = output<ClienteAPI>();  // version tradicional @Output() empresaSeleccionada: Empresa | null = null;  


    //#region - variables internas del componente
    ///filtrarBajas: boolean = false;
    
    empresaSeleccionada: ClienteAPI | null = null
    listaEmpresas: ClienteAPI[] = [];    
    //#endregion

    //#region - inyección del servicio
    // tradicional
    //constructor(public clienteService: ClienteService) {}
  
    // recomendada en las ultimas versiones
    private servicioCientes = inject(ClientesService);
    //#endregion

  
    ngOnInit(): void {
      this.getListaEmpresas();
    }
  
    // obtiene la lista empresa y selecciona opcionalmente la que tenga el codigo pasado como parametro
    getListaEmpresas(codigoSeleccionado?:string): void {
      this.servicioCientes.obtenerListaClientes().subscribe({
        next: (empresas) => {
          this.listaEmpresas = empresas;
          if (this.listaEmpresas.length === 0) {
            return;
          }
          if (codigoSeleccionado) {
            const empresa = this.listaEmpresas.find(empresa => empresa.codigo === codigoSeleccionado);
            if (empresa) { this.seleccionarEmpresa(empresa); }
          } else {
            this.seleccionarEmpresa(this.listaEmpresas[0]);
          }
        },
        error: (error) => {
          console.error('Error obteniendo empresas:', error);
        }
      });    
    }

    seleccionarEmpresa(empresa: ClienteAPI) {
      // ejemplo de console.log / console.table /alert
      console.log('Empresa seleccionda:',empresa);      // Muestra la informacion de la lista de clientes en la consola
      console.table(empresa);                           // Muestra la lista clientes en la consola en formato de tabla
      console.table(empresa, ['codigo','nombre']);      // Filtrar: Muestra solo las columnas 'codigo','nombre' de la tabla      
      // seleccion de empresa
      this.empresaSeleccionada = empresa;
      this.outEmpresaSeleccionada.emit(empresa);
    }

    desactivarEmpresa(empresa: ClienteAPI): void {
      this.servicioCientes.desactivarEmpresa(empresa).subscribe({
        next: (empresaActualizada) => {
          console.log('Empresa desactivada:', empresaActualizada );
          this.getListaEmpresas();
        },
        error: (error) => {console.error('Error desactivando empresa:',error);
        }
      });
    }    

    activarEmpresa(empresa: ClienteAPI): void {      
      this.servicioCientes.activarEmpresa(empresa).subscribe({
        next: (empresaActualizada) => {
          console.log('Empresa activada:', empresaActualizada );
          this.getListaEmpresas();
        },
        error: (error) => {console.error('Error activando empresa:',error);
        }
      });      
    }    

    bajaEmpresa(empresa: ClienteAPI): void {      
      this.servicioCientes.bajaEmpresa(empresa).subscribe({
        next: (empresaActualizada) => {
          console.log('Empresa dada de baja:', empresaActualizada );
          this.getListaEmpresas();
        },
        error: (error) => {console.error('Error dando baja empresa:',error);
        }
      }); 
    }

    cambiarEstado(empresa:ClienteAPI, newEstado:EstadoCliente): void {
      this.servicioCientes.cambiarEstado(empresa,newEstado);
    }

    eliminarEmpresa(empresa: ClienteAPI): void { 
      if (confirm(`¿Eliminar la empresa ${empresa.nombre}?`)) {       
        this.servicioCientes.eliminarEmpresa(empresa).subscribe({
          next: () => {
            console.log('Empresa Eliminada:', empresa );
            this.getListaEmpresas();
          },
          error: (error) => {console.error('Error eliminando empresa:',error);
          }
        });     
      }
  }    


}
