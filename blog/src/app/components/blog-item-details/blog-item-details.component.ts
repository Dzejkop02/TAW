import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from "../../services/data.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'blog-item-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';
  public title: string = ''
  public id: string = '';

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      if (this.id) {
        this.service.getById(this.id).subscribe((res: any) => {
          const post = res[0];
          this.image = post.image;
          this.text = post.text;
          this.title = post.title;
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/blog']);
  }

  deletePost(): void {
    if (this.id) {
      this.service.deletePost(this.id).subscribe(
        (res) => {
          console.log('Post usunięty:', res);
          // Po usunięciu przekierowujemy użytkownika do strony głównej bloga
          this.router.navigate(['/blog']);
        },
        (error) => {
          console.error('Błąd przy usuwaniu posta:', error);
        }
      );
    }
  }
}
