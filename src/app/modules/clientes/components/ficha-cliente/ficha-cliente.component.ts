import { Component, input, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClientesServiceHttp } from '../../services/clientes.http.service';
import { EmpresaAPI, EstadoCliente, EstadoFormulario } from '../../models/cliente.model';
@Component({
  selector: 'app-ficha-cliente',
  imports: [FormsModule],
  templateUrl: './ficha-cliente.component.html',
  styleUrl: './ficha-cliente.component.css'
})

export class FichaClienteComponent implements OnInit {
  
  // gestion del router para obtener el paso de parametros
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  clienteId = this.route.snapshot.paramMap.get('id');  //el valor es siempre un string

  public readonly estadoFormulario = EstadoFormulario;

  // parametro de entrada para recibir la empresa seleccionada desde el componente padre
  //@input() empresa: Empresa | null = null;
  // @Input() empresa: Empresa = { codigo: '', nombre: '', nif: '', direccion: { calle: '', numero: 0, provincia: '' } }; 
  inEmpresaSeleccionada = input<EmpresaAPI | null>();
  inOperacion = input<EstadoFormulario>();

  servicioCliente = inject(ClientesServiceHttp);

  //#region - declaracion de variables internas del componente
  operacion: EstadoFormulario = EstadoFormulario.Consulta;
  modoEdicion: boolean = false;
  empresa: EmpresaAPI = this.inicializarEmpresa();
  empresaCopia: EmpresaAPI = this.inicializarEmpresa(); 
  //endregion 

  // constructor() {
  //   this.empresa = this.empresaSeleccionada();
  // }

  ngOnInit(): void {
    //this.empresa= this.inEmpresaSeleccionada();
    //this.inicializarEmpresa();
    if (this.clienteId) {
      this.obtenerEmpresaAPI(this.clienteId);
    }
  }
  
  // funcion para inicializar una Empresa a Vacia -> Uso para tener siempre una empresa definido para [ngModel]
  inicializarEmpresa():EmpresaAPI{
    return  {
      id: undefined,
      codigo: '',
      nif: '',
      estado: EstadoCliente.Activo ,
      nombre: '',
      direccion: {
        calle: '',
        numero: undefined,
        poblacion: '',
        provincia: ''
      }
    };
  }


  //#region - metodos de gestión de datos con la API

  obtenerEmpresaAPI(idEmpresa:string){
     console.log('Obtener Datos empresa con ID: ', this.empresa);
     this.servicioCliente.obtenerCliente(idEmpresa).subscribe({
      next: (empresa) => {
        console.log('Obtenidos datos empresa correctamente');
        this.empresa = empresa
      },
      error: (error) => {
        alert('Error API obteniendo empresa:\n' + error);
      }          
    })    
  }


  actualizarEmpresaAPI(){
    console.log('Insertar nuevo empresa:', this.empresa);
    this.servicioCliente.actualizarCliente(this.empresa).subscribe({
      next: () => {
        console.log('Empresa actualizanda por el API:', this.empresa );
        this.empresaCopia = structuredClone(this.empresa);
        this.operacion = this.estadoFormulario.Consulta;
        this.modoEdicion = false;
        alert('Empresa Actualizada');
      },
      error: (error) => {
        alert('Error API actualizando empresa:\n' + error);
      }          
    })   
  }

  insertarEmpresaAPI(){
    console.log('Insertar nuevo empresa:', this.empresa);
    this.servicioCliente.insertarCliente(this.empresa).subscribe({
      next: (empresa) => {
        console.log('Empresa Insertada por el API:', this.empresa );
        this.empresaCopia = structuredClone(this.empresa);
        this.operacion = this.estadoFormulario.Consulta;
        this.modoEdicion = false;
        alert('Empresa Inserada con ID' + empresa.id);
      },
      error: (error) => {
        alert('Error API insertando empresa:\n' + error);
      }          
    })    
  }

  //#endregion - metodos de gestión de datos con la API


  //#region - gestion de botones del formulario
  btnVolver(){
    //this.router.navigate(['/lista-clientes-final']); -> Navagando con el router a una pagina determinada
    this.location.back();  // volver a la anterior
  }


  btnInsertar(){
    // guardo copia de empresa actual por si cancelo
    this.empresaCopia = structuredClone(this.empresa);
    this.inicializarEmpresa();
    this.modoEdicion = true;
    this.operacion = this.estadoFormulario.Insercion;
  }

  btnEditar(){
    // guardo copia de empresa actual por si cancelo
    this.empresaCopia = structuredClone(this.empresa);
    this.inicializarEmpresa();
    this.modoEdicion = true;
    this.operacion = this.estadoFormulario.Edicion;
  }

  // boton Cancelar
  btnCancelar(form: NgForm){
    console.log('cancelar operacion');
    this.empresa = structuredClone(this.empresaCopia);
    form.resetForm();
    this.operacion = this.estadoFormulario.Consulta;
    this.modoEdicion = false;
  }

  // boton confirmar actualizacion/insercion
  btnConfirmar(form: NgForm): void {
    //Validacion del formulario
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    // formulario Valido
    else {
      console.log('Formulario válido', this.empresa);
      if (this.operacion == this.estadoFormulario.Edicion) {
        this.actualizarEmpresaAPI();
      }
      else if (this.operacion == this.estadoFormulario.Insercion) {
        this.insertarEmpresaAPI();
      }
      else return
    }
    
    // Aquí llamarías al servicio para guardar
  }  

  //#endregion - gestion de botones del formulario

}
