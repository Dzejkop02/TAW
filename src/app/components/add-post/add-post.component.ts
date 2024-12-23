import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'add-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  inputTitle: string = '';
  inputText: string = '';

  constructor(private dataService: DataService) {
  }

  addPost(event: Event) {
    event.preventDefault();
    if (this.inputTitle.trim() && this.inputText.trim()) {
      this.dataService.addPost(this.inputTitle.trim(), this.inputText.trim());
      this.inputTitle = '';
      this.inputText = '';
    }
  }
}
