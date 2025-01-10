import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";
import {BlogComponent} from "../blog/blog.component";
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [SearchBarComponent, BlogComponent, CommonModule],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent implements OnInit {
  public filterText: string = '';

  constructor() {
  }
 
  ngOnInit(): void {
  }
 
  getName($event: string): void {
    this.filterText = $event;
  }
}
