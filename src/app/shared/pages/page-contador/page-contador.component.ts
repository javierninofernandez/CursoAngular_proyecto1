/* Ejemplo basico para ver la diferencia entre el uso de propiedades y señales */
import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-page-contador',
  imports: [NavbarComponent,HeaderComponent,FooterComponent],
  templateUrl: './page-contador.component.html',
  styleUrl: './page-contador.component.css'
})
export class PageContadorComponent {
  contador = 0;
  // las señales se identifican por signal()
  countadorSignal = signal(0);

  constructor() {}

  increaseBy(value: number) {
    this.contador += value;    
    // Para acceder a su valor no se asigna directamente. Usamos los metodos set/update
    // this.counterSignal.set(this.counterSignal() + value);
    this.countadorSignal.update((current) => current + value);
  }

  resetCounter() {
    this.contador = 0;
    this.countadorSignal.set(0);
  }
}
