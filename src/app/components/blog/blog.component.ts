import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {GalleryComponent} from '../gallery/gallery.component';

interface BlogItem {
  text: string;
  title: string;
  image: string;
  id: string;
}

@Component({
 selector: 'blog',
 standalone: true,
 imports: [BlogItemComponent, CommonModule, GalleryComponent],
 providers: [DataService],
 templateUrl: './blog.component.html',
 styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
 public items: BlogItem[] = [];
 public images: string[] = [];

 constructor(private service: DataService) {
 }

 ngOnInit() {
   this.items = this.service.getAll();
   this.images = this.items.map(item => item.image);
 }
}
