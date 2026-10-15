import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding  } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from  '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { DialogService } from 'primeng/dynamicdialog';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
              provideRouter(routes, withComponentInputBinding()),
              // inlcuir provideHttpClient() para uso de servicios integrados con API's a traves de HTTP
              provideHttpClient(),              
              // Uso de PrimeNg
              provideAnimationsAsync(),
              providePrimeNG({ theme: { preset: Aura }}),
               DialogService
            ]
};
