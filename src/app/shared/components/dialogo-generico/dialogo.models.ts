export type TipoDialogo =
  | 'INFO'
  | 'ERROR'
  | 'CONSULTA'
  | 'CONFIRMACION';

export type AccionDialogo =
  | 'ACEPTAR'
  | 'CANCELAR'
  | 'OK';

export interface DialogoConfig {
  titulo: string;
  mensaje: string;
  tipo: TipoDialogo;
  textoAceptar?: string;
  textoCancelar?: string;
  textoOk?: string;
  ancho?: string;
}