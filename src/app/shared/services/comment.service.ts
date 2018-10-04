import { Injectable }   from '@angular/core';
import { HttpClient }  from '@angular/common/http';

import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl = 'http://localhost:3000/comments';
  constructor(private http: HttpClient) {}

  addComment(comment: Comment) {
  console.log(comment);
    return this.http.post(this.commentsUrl, comment).subscribe();
  }

  getById(commentid: number) {
    return this.http.get(this.commentsUrl + '/' + commentid ).subscribe()  ;
  }

  deleteComment(comment: Comment) {
    return this.http.delete(this.commentsUrl  + '/' + comment.id ).subscribe()  ;
  }

  updateComment(comment: Comment) {
    return this.http.put(this.commentsUrl + '/' + comment.id, comment).subscribe();
  }
}
