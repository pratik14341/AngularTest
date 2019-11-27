import { Component,ViewEncapsulation } from '@angular/core';
import { environment } from '../environments/environment';  

@Component({
  selector: 'app-root',
  templateUrl: './html/app.html',
  //styleUrls: ['./css/app.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = environment.Title;
}
