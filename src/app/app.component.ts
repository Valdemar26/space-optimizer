import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeaturesModule } from './features/features.module';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    FeaturesModule,
    RouterLink,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    RouterLinkActive,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'space-optimizer';

  constructor() {
  }
}
