import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: [],
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background-color: #184685;
    }
  `]
})
export class BlankComponent {
  constructor() {}
}


