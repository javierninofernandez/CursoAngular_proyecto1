import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-page-default',
  imports: [NavbarComponent, FooterComponent, HeaderComponent],
  templateUrl: './page-default.component.html',
  styleUrl: './page-default.component.css'
})
export class PageDefaultComponent {

}
