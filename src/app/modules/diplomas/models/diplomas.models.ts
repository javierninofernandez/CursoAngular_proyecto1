export enum TipoTramite {
    nombramiento = 'NOMBRAMIENTO',
    ascenso = 'ASCENSO',
    finServicioBaja = 'FIN_SERVICIO_BAJA',
    honorifico = 'HONORIFICO',
}

export enum EstadoTramite {
    revisandoDoc = 'REVISANDO_DOCUMENTACION',
    envioCGET = 'ENVIO_CGET',
    recibidoSecrets = 'RECIBIDO_SECRETS',
    entregadoConfirmado = 'ENTREGADO_CONFIRMADO',
}

export enum AccionesDiploma {
    enviarCGET = 'Enviar CGET',
    recibidoSECRETS = 'Recibido SECRETS',
    confirmarEntrega = 'Confirmar Entrega'

}

export interface Reservista {
    nombre: string;
    apellidos: string;
    rango?: string;
    fechaNacimiento?: Date
    fechaIncorporacion?: Date   
}

export interface TramiteDiploma {
    expediente: string;
    reservista: Reservista;
    tipoTramite : TipoTramite;
    origen : 'ACTIVO' | 'BAJA'
    docValida: boolean;
    estadoActual : EstadoTramite;

}