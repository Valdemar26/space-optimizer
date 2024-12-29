import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FeaturesModule} from './features/features.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FeaturesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'space-optiizer';
}
