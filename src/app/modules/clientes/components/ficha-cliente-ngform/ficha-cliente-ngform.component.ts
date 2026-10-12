/* 
  Formulario Basado en plantillas usando FormsModule/ngForm 
  - [(ngModel)]="empresa.direccion.calle"
  - name="calle"
  - #calle="ngModel"
  - required
  - [disabled]="!modoEdicion"

  Utilización del servicio con API's 
  Uso extendido del Router
    - Llamadas con parametros (ActivatedRoute)
    - Volver (location.back)
*/
import { Component, input, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClientesServiceHttp } from '../../services/clientes.http.service';
import { EmpresaAPI, EstadoCliente, EstadoFormulario } from '../../models/cliente.model';
@Component({
  selector: 'app-ficha-cliente-ngform',
  imports: [FormsModule],
  templateUrl: './ficha-cliente-ngform.component.html',
  styleUrl: './ficha-cliente-ngform.component.css'
})

export class FichaClienteNgformComponent implements OnInit {
  
  // gestion del router para obtener el paso de parametros (injeccion para su uso de ActivateRoute y Location)
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  clienteId = this.route.snapshot.paramMap.get('id');  // obtencion del parametro -> el valor es siempre un string

  // injeccion para uso del servicio
  servicioCliente = inject(ClientesServiceHttp);
  
  
  //#region - declaracion de variables internas del componente
  public readonly estadoFormulario = EstadoFormulario;

  readonly estadosCliente = Object.keys(EstadoCliente).map(key => ({
    texto: key,                                         
    valor: EstadoCliente[key as keyof typeof EstadoCliente] 
  }));  
  estado:string = '';
  
  componenteOrigen: string = '';
  volverVisible: boolean = false;

  operacion: EstadoFormulario = EstadoFormulario.Consulta;
  modoEdicion: boolean = false;

  empresa: EmpresaAPI = this.inicializarEmpresa();
  empresaCopia: EmpresaAPI = this.inicializarEmpresa(); 
  //endregion 



  ngOnInit(): void {
    // obtener el componente desde el que se le llama
    const origen = history.state.origen;
    console.log('Navegación iniciada desde:', (origen) ? origen : 'sin definir');
    if (origen == undefined || origen=='NavBar') {
      this.volverVisible = false;
    }
    else {
      this.volverVisible = true;
    }
    
    // comprobar si se le ha pasado parametro ID en la ruta
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
      estado: undefined ,
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
    // variables control estado formulario
    this.modoEdicion = true;
    this.operacion = this.estadoFormulario.Insercion;
    // inicializar empresa
    this.inicializarEmpresa();
  }

  btnEditar(){
    // guardo copia de empresa actual por si cancelo
    this.empresaCopia = structuredClone(this.empresa);
    // variables control estado formulario
    this.modoEdicion = true;
    this.operacion = this.estadoFormulario.Edicion;
    //this.inicializarEmpresa();
  }

  // boton Cancelar
  btnCancelar(form: NgForm){
    console.log('cancelar operacion');
    // reestablecemos copia del valor empresa antes editar/insertar
    this.empresa = structuredClone(this.empresaCopia);
    // actualizoi variables control estado formulario
    this.operacion = this.estadoFormulario.Consulta;
    this.modoEdicion = false;
    // reset posibles aviso de campos invalidos en el formulario
    form.resetForm();
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
  }  

  //#endregion - gestion de botones del formulario

}
