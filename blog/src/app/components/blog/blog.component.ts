import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FilterTextPipe} from "../../pipes/filter-text.pipe";
import {GalleryComponent} from '../gallery/gallery.component';

interface BlogItem {
  _id: string;
  image: string;
  text: string;
  title: string;
}

@Component({
  selector: 'blog',
  standalone: true,
  imports: [HttpClientModule, BlogItemComponent, CommonModule, FilterTextPipe, GalleryComponent],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  @Input() filterText: string = '';

  public items$: BlogItem[] = [];
  public images: string[] = [];

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response as BlogItem[];
      this.images = this.items$.map((item: BlogItem) => item.image);
    });
  }
}
