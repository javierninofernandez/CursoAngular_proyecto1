/* posible fichro con constantes y variables de configuracion de nuestra aplicación *
/* uso general dentro de la app */

// Ejemplo

export class ConfiGlobal {

  // aplicacion && version 
  public static appName : string = 'Nombre de la APP'
  public static version : string = '1.26.41.1';        //rev. 05/10/2026 -  
  
  // VARIABLES DE DISEÑO 
  public static altoMinBotonesXS: number = 35;
  public static altoMaxBotonesXS: number = 50;
  public static colorReadOnly: string = '#CACACA';
  public static colorValido: string =  '#66cc66';
  public static colorError: string = '#FB7C7C';
  public static colorFoco: string = '#d5f1f9';  

  // otros valores de uso generico
  public static arrayIdiomas = [];
}
