import { Component, inject } from '@angular/core';

// componentes primeNG para la tabla
import { TableModule } from 'primeng/table';  // importamos componente table de primeNG
import { TagModule } from 'primeng/tag';

// importaciones personales
import { DiplomasService } from '../../services/diplomas.service';
import { TramiteDiploma, EstadoTramite, TipoTramite } from '../../models/diplomas.models';
import { NgClass, NgPlural } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-lista-diplomas',
  imports: [
    TableModule,
    TagModule,
    NgClass,
    FormsModule,
    SelectModule,
  ],
  templateUrl: './lista-diplomas.component.html',
  styleUrl: './lista-diplomas.component.css'
})
export class ListaDiplomasComponent {

  diplomasService = inject(DiplomasService);

  EstadoTramite = EstadoTramite;
  listaTramites : TramiteDiploma[]=[];  
  tramiteSeleccionado : TramiteDiploma | undefined | null = undefined;

  opcionesFiltroTipoTramnite = Object.values(TipoTramite).map(tipo => ({
        label: tipo,
        value: tipo
  }));
  tipoTramiteSeleccionado: string | null = null;
  listaTramitesFiltrados: TramiteDiploma[] = [];

  opcionesBooleanas = [
    { label: 'Sí', value: true },
    { label: 'No', value: false }
];

  ngOnInit(){
    this.getListaTramites()
  }

    getListaTramites(tipo?:TipoTramite, estado?:EstadoTramite): void {
      this.diplomasService.obtenerListaTramites(tipo,estado).subscribe({
        next: (tramites) => {
          this.listaTramites = tramites;
          this.listaTramitesFiltrados = [...tramites];
          if (this.listaTramites.length === 0) {
            return;
          }
        },
        error: (error) => {
          console.error('Error obteniendo empresas:', error);
        }
      });    
    }  


    cambiarEstadoTramite(tramite:TramiteDiploma,newEstado:EstadoTramite) {
      this.diplomasService.actualizarEstadoTramite(tramite,newEstado).subscribe({
        next: (tramite) => {
          alert('tramite Actualizado');
          this.getListaTramites();
        },
        error: (error) => {
          console.error('Error obteniendo empresas:', error);
        }        
      })        
    }

    //#region - eventos p-table de primeNg 


    filtrarPorTipoTramite(){
        console.log('Seleccionado:', this.tipoTramiteSeleccionado);
        if (!this.tipoTramiteSeleccionado) {
            this.listaTramitesFiltrados = [...this.listaTramites];
            return;
        }
        this.listaTramitesFiltrados = this.listaTramites.filter(
            tramite => tramite.tipoTramite === this.tipoTramiteSeleccionado
        );
        console.log('Resultados:', this.listaTramitesFiltrados.length);   
    }

    alSeleccionarFila(tramite: any): void {
        this.tramiteSeleccionado = tramite;
    }    

    getEstadoTramite(status: EstadoTramite) {
        switch (status) {
            case EstadoTramite.entregadoConfirmado:
                return 'success';
            case EstadoTramite.revisandoDoc:
                return 'warn';
            case EstadoTramite.envioCGET:
                return 'primary';
            case EstadoTramite.recibidoSecrets:
                return 'contrast';
            default:
                return 'secondary';
        }
    }    

    getOrigen(origen: string) {
        switch (origen) {
            case 'ACTIVO':
                return 'success';
            case 'BAJA':
                return 'info';
            default:
                return 'secondary';
        }
    }     
    //#endregion  
}
