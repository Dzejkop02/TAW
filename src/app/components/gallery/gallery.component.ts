import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
 @Input() images?: string[];

  columns: number = 5;
  minColumns: number = 1;
  maxColumns: number = 6;

  zoomIn() {
    if (this.columns > this.minColumns) {
      this.columns--;
    }
  }

  zoomOut() {
    if (this.columns < this.maxColumns) {
      this.columns++;
    }
  }
}
