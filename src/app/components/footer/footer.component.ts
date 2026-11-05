import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  openNewTab(social: number): void {
    if(social === 1) {
      window.open('https://www.linkedin.com/in/gabriel-amorim-187891136', '_blank');
    } else {
      window.open('https://github.com/gallak1', '_blank');
    }
  }
}
