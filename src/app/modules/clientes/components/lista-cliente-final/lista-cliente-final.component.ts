/*
lista-cliente-final.componente : version final con servicio de API 
- Uso de servicios con API (observables)
- Gestion de parametros de entrada y salida (Empresa Seleccionada y Filtrar ahora estan en el padre page-lista-clientes-final)
- Se añaden opciones de editar/insertar
- Comunicación con componente de la ficha del cliente --> Llamada a una ruta desde typeScript con parametro opcional
*/

import { Component, output, input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { EmpresaAPI,EstadoCliente } from '../../models/cliente.model';
import { ClientesServiceHttp } from '../../services/clientes.http.service'

@Component({
  selector: 'app-lista-cliente-final',
  imports: [NgClass],
  templateUrl: './lista-cliente-final.component.html',
  styleUrl: './lista-cliente-final.component.css'
})
export class ListaClienteFinalComponent {

    public readonly estadoCliente = EstadoCliente; // Para poder usar el enumerado en la plantilla HTML
   
    // Gestion de comunicacion con el padre 
    // Entrada input -> del padre al hijo -> Hay que filtrar 
    // Salida output -> del hijo al padre -> Empresa Seleccionada
    filtrarBajas = input<boolean>(false);              // verion tradicional @Input() filtrarBajas: boolean = false;
    outEmpresaSeleccionada = output<EmpresaAPI>();    // version tradicional @Output() empresaSeleccionada: Empresa | null = null;  

    //#region - variables internas del componente
    empresaSeleccionada: EmpresaAPI | null = null
    listaEmpresas: EmpresaAPI[] = [];    
    //#endregion

    //#region - inyección del servicio
    // tradicional --> constructor(public clienteService: ClienteService) {}    
    private servicioCientes = inject(ClientesServiceHttp);    // recomendada en las ultimas versiones
    //#endregion

    //injeccion del router para navegar desde codigo a ficha_cliente
    private router = inject(Router);

    // utilizamos el evento OnInt del ciclo de vida para cargar los datos de la API 
    ngOnInit(): void {
      this.getListaEmpresas();
    }

    seleccionarEmpresa(empresa: EmpresaAPI) {
      // ejemplo de console.log / console.table /alert
      console.log('Empresa seleccionda:',empresa);      // Muestra la informacion de la lista de clientes en la consola
      console.table(empresa);                           // Muestra la lista clientes en la consola en formato de tabla
      console.table(empresa, ['codigo','nombre']);      // Filtrar: Muestra solo las columnas 'codigo','nombre' de la tabla      
      // seleccion de empresa
      this.empresaSeleccionada = empresa;
      this.outEmpresaSeleccionada.emit(empresa);        // lanzamos emit para comunicacion con el padre
    }
  

    //#region - metodos que interactuan con el servicio/apis

    // obtiene la lista empresa y selecciona opcionalmente selecciona la que tenfa el codigo pasado como parametro
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

    /*
      En las funciones que cambian los valores de una empresa cuando se resuelve correctamente 
      añadimos una llamada o obtener empresas para refrescar cambios en la lista que se hayan
      producido por la interacción de otros usuarios de la app 
      (en lugar de modificar el valor retronado localmente)
    */
   
    desactivarEmpresa(empresa: EmpresaAPI): void {
      this.servicioCientes.desactivarEmpresa(empresa).subscribe({
        next: (empresaActualizada) => {
          console.log('Empresa desactivada:', empresaActualizada );
          this.getListaEmpresas();
        },
        error: (error) => {console.error('Error desactivando empresa:',error);
        }
      });
    }    

    activarEmpresa(empresa: EmpresaAPI): void {      
      this.servicioCientes.activarEmpresa(empresa).subscribe({
        next: (empresaActualizada) => {
          console.log('Empresa activada:', empresaActualizada );
          this.getListaEmpresas();
        },
        error: (error) => {console.error('Error activando empresa:',error);
        }
      });      
    }    

    bajaEmpresa(empresa: EmpresaAPI): void {      
      this.servicioCientes.bajaEmpresa(empresa).subscribe({
        next: (empresaActualizada) => {
          console.log('Empresa dada de baja:', empresaActualizada );
          this.getListaEmpresas();
        },
        error: (error) => {console.error('Error dando baja empresa:',error);
        }
      }); 
    }

    cambiarEstado(empresa:EmpresaAPI, newEstado:EstadoCliente): void {
      this.servicioCientes.cambiarEstado(empresa,newEstado).subscribe({
        next: (empresaActualizada) => {
          this.getListaEmpresas();
        },
        error: (error) => {console.error('Error cambiando estado:',error);
        }
      }); 
    }

    eliminarEmpresa(empresa: EmpresaAPI): void { 
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

    //#endregion - metodos que interactuan con el servicio/apis


    // botones y funciones añadidos para ir a la dicha del cliente seleccionado / insertar uno nuevo
    editarEmpresa(empresa:EmpresaAPI){
      this.router.navigate(['/ficha-cliente/editar', empresa.id]);
    }

    insertarEmpresa(){
      this.router.navigate(['/ficha-cliente']); 
    }
    
}
