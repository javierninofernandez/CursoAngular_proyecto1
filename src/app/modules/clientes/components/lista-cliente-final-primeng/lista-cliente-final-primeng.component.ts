/*
lista-cliente-final-primeng.componente : Adaptacion lista-cliente-final-primeng usando componente table de primeNG
- convertir la tabla html a usar componente p-table de packete primeNg
Cambios
HTML original						          PrimeNG
<table class="tabla-empresas">		<p-table [value]="listaEmpresas">
<thead>								            <ng-template #header>
<tbody> y @for						        <ng-template #body let-empresa>
@for (empresa of listaEmpresas)		PrimeNG itera automáticamente sobre [value]
Tabla sin paginación				      Paginación integrada con [paginator]="true"
Tabla adaptable manualmente			  responsiveLayout="scroll"
*/

import { Component, output, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaAPI,EstadoCliente } from '../../models/cliente.model';
import { ClientesServiceHttp } from '../../services/clientes.http.service'

// componentes primeNG para la tabla
import { TableModule } from 'primeng/table';  // importamos componente table de primeNG
import { TagModule } from 'primeng/tag';
// compoennete generico basado en dialog primeNG para consultas 
//import { DialogoGenericoComponent } from '../../../../shared/components/dialogo-generico/dialogo-generico.component';
//import { DialogService } from 'primeng/dynamicdialog';
import { DialogoService } from '../../../../shared/components/dialogo-generico/dialogo-generico.service';



@Component({
  selector: 'app-lista-cliente-final-primeng',
  imports: [
    TableModule, TagModule,     
  ],
  templateUrl: './lista-cliente-final-primeng.component.html',
  styleUrl: './lista-cliente-final-primeng.component.css'
})
export class ListaClienteFinalPrimengComponent {

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

    //injeccion del router para navegar desde codigo a ficha_cliente
    private router = inject(Router);

    // servicio para llamadas y uso de dialog-generico
    private dialogo = inject(DialogoService);  // servicio para uso de dialog-generico 

    //#endregion


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

    async eliminarEmpresa(empresa: EmpresaAPI) { 
      //if (confirm(`¿Eliminar la empresa ${empresa.nombre}?`)) {  
      // const accion = await this.dialogoComponent.dialogoConfirmacion('Confirmar','¿Seguro que desea eliminar el registro');
      // if (accion === 'ACEPTAR') {
      this.dialogo.confirmar('Confirmar Eliminar','¿Seguro que deseas eliminar este cliente?').subscribe(accion => {
        if (accion === 'ACEPTAR') {
            this.servicioCientes.eliminarEmpresa(empresa).subscribe({
              next: () => {
                console.log('Empresa Eliminada:', empresa );
                this.getListaEmpresas();
              },
              error: (error) => {
                console.error('Error eliminando empresa:',error); 
              }
            });           
        }    
      });
    }


    // botones y funciones añadidos para ir a la dicha del cliente seleccionado / insertar uno nuevo
    editarEmpresa(empresa:EmpresaAPI){
      this.router.navigate(['/ficha-cliente/editar', empresa.id], {
        state: { origen: 'lista-clientes-final'} 
      });
    }

    insertarEmpresa(){
      this.router.navigate(['/ficha-cliente'], {
        state: { origen: 'lista-clientes-final'} 
      });
    }
        
    //#endregion - metodos que interactuan con el servicio/apis

   

    //#region - eventos p-table de primeNg 

    alSeleccionarFila(empresa: any): void {
      //this.empresaSeleccionada = empresa;
      this.seleccionarEmpresa(empresa);
    }    

    getSeverity(status: EstadoCliente) {
        switch (status) {
            case EstadoCliente.Activo:
                return 'success';
            case EstadoCliente.Inactivo:
                return 'warn';
            case EstadoCliente.Baja:
                return 'danger';
            default:
                return 'secondary';
        }
    }    
    //#endregion
}
