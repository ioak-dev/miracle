import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reshape';
  textArea:boolean=false

  opentextArea(){
    this.textArea=true;
  }
}
