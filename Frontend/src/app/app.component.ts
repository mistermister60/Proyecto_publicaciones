import { Component } from '@angular/core';
import { DataService } from './Services/data.service';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  constructor(public Data: DataService, public authService: AuthService, public router: Router) {}
  user = this.authService.getUser();
}
