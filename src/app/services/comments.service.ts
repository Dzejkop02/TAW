import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments = new Map<string, string[]>();

  constructor() { }

  public addComment(id: string, comment: string) {
    if (!this.comments.has(id)) {
      this.comments.set(id, []);
    }

    const comments = this.comments.get(id);
    if (comments) {
      comments.push(comment);
      this.comments.set(id, comments);
    }
  }

  public getComments(id: string) {
    return this.comments.get(id) || [];
  }
}
