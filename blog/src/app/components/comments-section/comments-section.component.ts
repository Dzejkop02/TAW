import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from '../../services/comments.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'comments-section',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent implements OnInit {
  @Input() postId?: string;
  comments: string[] = [];
  newComment: string = '';

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    if (this.postId) {
      this.loadComments();
    }
  }

  loadComments() {
    this.comments = this.commentsService.getComments(this.postId!);
  }

  addComment(event: Event) {
    event.preventDefault();
    if (this.postId && this.newComment.trim()) {
      this.commentsService.addComment(this.postId, this.newComment.trim());
      this.loadComments();
      this.newComment = '';
    }
  }
}
