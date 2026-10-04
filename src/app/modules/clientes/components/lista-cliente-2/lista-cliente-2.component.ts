/*
lista-cliente-2.componente : Reutilizacion de lista-cliente para aplicar el uso de Servicios
- Objetivo:
- Introduccion a los servicios de Angular para encapsular la gestión de datos
*/
import { Component, output, inject } from '@angular/core';
import { Empresa,EstadoCliente } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    
    empresaSeleccionada: Empresa | null = null
    
    filtrarBajas: boolean = false;
    // tradicional
    //constructor(public clienteService: ClienteService) {}
  
    // recomendada en las ultimas versiones
    //public servicioCientes = inject(ClienteService);
  
    //empresaSeleccionada: Empresa | null = null;

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
          }
      ];
  
    ngOnInit(): void {
      //this.getListaEmpresas();
      //this.empresaSeleccionada = this.listaEmpresas[0]; // Selecciona la primera empresa por defecto;
      if (this.listaEmpresas.length > 0) { 
         this.seleccionarEmpresa(this.listaEmpresas[0]); // Selecciona la primera empresa por defecto 
      }
    }
  
    // getListaEmpresas(){
    //   this.listaEmpresas = this.servicioCientes.getListaEmpresas();
    // }

    seleccionarEmpresa(empresa: Empresa) {
      console.log('Empresa seleccionada:', empresa);
      this.empresaSeleccionada = empresa;
      this.outEmpresaSeleccionada.emit(empresa);
    }

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
      // Lógica para cambiar el estado a Baja
      console.log('Dar de baja:', empresa);     
      this.cambiarEstado(empresa,this.estadoCliente.Baja);
    }

    cambiarEstado(empresa:Empresa, newEstado:EstadoCliente): void {
      alert('Cambiar Estado');
      let index:number = this.listaEmpresas.findIndex( (cl) => cl.codigo == empresa.codigo );      
      if (index >=0 ) {
        alert('CAMBIO ESTADO: Estado Anterior:'+this.listaEmpresas[index].estado+' -> Nuevo Estado:'+newEstado);
        this.listaEmpresas[index].estado = newEstado;
      }
    }

    eliminarEmpresa(empresa: Empresa): void {
      // Lógica para eliminar
      console.log('Eliminar:', empresa);
    }    

    filtrarLista(){

    }
}
