import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  likes = 0;
  title = 'Angular testing';

  like(): void{
    this.likes++;
  }
}
