/*
Paso d formulario ficha-cliente basado en plantillas (ngForm + ngModel) a un formulario Reactivo
La idea es eliminar [(ngModel)], #campo="ngModel" y ngForm, y definir la estructura del formulario 
en el .ts del componente con FormGroup y FormControl.
Uso de metodos del formulario reactivo enabled(), disabled() para controlar estado
*/
import { Component, inject  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

import { EstadoCliente, EstadoFormulario, EmpresaAPI} from '../../models/cliente.model'
import { ClientesServiceHttp } from '../../services/clientes.http.service'

@Component({
  selector: 'app-ficha-cliente-reactform',
  imports: [ReactiveFormsModule],
  templateUrl: './ficha-cliente-reactform.component.html',
  styleUrl: './ficha-cliente-reactform.component.css',
})
export class FichaClienteReactformComponent {

  // gestion del router para obtener el paso de parametros (injeccion para su uso de ActivateRoute y Location)
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  clienteId = this.route.snapshot.paramMap.get('id');  // obtencion del parametro -> el valor es siempre un string  

  // injeccion para uso del servicio
  servicioCliente = inject(ClientesServiceHttp);

  //#region - declaracion de variables internas del componente
  //public readonly estadoFormulario = EstadoFormulario;

  readonly estadosCliente = Object.keys(EstadoCliente).map(key => ({
    texto: key,                                         
    valor: EstadoCliente[key as keyof typeof EstadoCliente] 
  }));  
  estado:string = '';

  componenteOrigen: string = '';
  volverVisible: boolean = false;

  operacion: EstadoFormulario = EstadoFormulario.Consulta;
  //modoEdicion: boolean = false;

  empresa: EmpresaAPI = this.inicializarEmpresa();
  empresaCopia: EmpresaAPI = this.inicializarEmpresa(); 
  //endregion 
  
  //#region - Formulario Reactivo 
  
  // inyeccion para el uso de FormBuilder
  private fb = inject(FormBuilder);

  // definicion del formulario
  empresaForm: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    codigo: ['', Validators.required],
    nif: ['', Validators.required],
    estado: ['', Validators.required],
    nombre: ['', Validators.required],

    direccion: this.fb.group({
      calle: ['', Validators.required],
      numero: [''],
      codigopostal: [''],
      poblacion: [''],
      provincia: ['']
    })
  });

  get f() {
    return this.empresaForm.controls;
  }

  get direccion() {
    return this.empresaForm.get('direccion') as FormGroup;
  }

  //#endregion


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
    this.empresaForm.disable();
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


  //#region botones del formulario 
  btnConfirmar(): void {
    // Validacion del formulario
    if (this.empresaForm.invalid) {
      this.empresaForm.markAllAsTouched();
      return;
    }
    // formulario Valido
    else {
      // obtener los datos del formulario -> getRawValue() /Nota: incluye también los controles disabled
      const empresa = this.empresaForm.getRawValue();   
      //console.log('Formulario Valido -> Empresa:', empresa);
      // diferenciamos entre insert o update      
      if (this.operacion == EstadoFormulario.Edicion) {
        this.actualizarEmpresaAPI();
      }
      else if (this.operacion == EstadoFormulario.Insercion) {
        this.insertarEmpresaAPI();
      }
      else return
    }    
  }

  btnEditar(): void {
    // guardo copia de empresa actual por si cancelo
    this.empresaCopia = structuredClone(this.empresa);
    // variables control operacion 
      this.operacion = EstadoFormulario.Edicion;
    // Habilitamos edicion del formulario
    //this.modoEdicion = true; -> lo hacemos directamente con formulario.enabled()
    this.empresaForm.enable();    
    this.empresaForm.get('id')?.disable(); // El ID continúa siendo solo lectura
  }

  btnInsertar(): void {
    // guardo copia de empresa actual por si cancelo
    this.empresaCopia = structuredClone(this.empresa);    
    // variables control estado formulario
    //this.modoEdicion = true;
    //this.operacion = this.estadoFormulario.Edicion;
    // inicialización del formulario y habilitar edicion
    this.empresaForm.reset(this.inicializarEmpresa());
    this.empresaForm.enable();
    this.empresaForm.get('id')?.disable();
  }

  btnCancelar(): void {
    // variables control operacion
    this.operacion = EstadoFormulario.Consulta;
    // desabilitamos el formulario
    // this.modoEdicion = false; -> lo hacemos con formulario.disabled()M
    this.empresaForm.disable();
    // restauramos los datos de la copia o llamada al api para volve a cargar
    this.empresa = structuredClone(this.empresaCopia);  
  }

  btnVolver(): void {
    //this.router.navigate(['/lista-clientes-final']); -> Navagando con el router a una pagina determinada
    this.location.back();  // volver a la anterior
  }

  //#endregion


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
        this.operacion = EstadoFormulario.Consulta;
        //this.modoEdicion = false;
        this.empresaForm.disable();
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
        this.operacion = EstadoFormulario.Consulta;
        //this.modoEdicion = false;
        this.empresaForm.disable();
        alert('Empresa Inserada con ID' + empresa.id);
      },
      error: (error) => {
        alert('Error API insertando empresa:\n' + error);
      }          
    })    
  }

  //#endregion - metodos de gestión de datos con la API




}
