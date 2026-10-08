import { Component } from '@angular/core';
import { NavbarComponent} from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
