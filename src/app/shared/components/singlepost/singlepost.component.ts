import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { Router } from '@angular/router';


import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { PostService } from '../../services/post.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DataService } from './../../services/data.service';
import { CommentformComponent } from '../commentform/commentform.component';
import { PostformComponent } from '../postform/postform.component';
import { CommentService } from './../../services/comment.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.scss']
})
export class SinglepostComponent implements OnInit {
  @Input() post: Post = new Post() ;
  @Input() posts: Array<Post>;
  public comments: Array<Comment>;
  public comm: Comment;
  constructor(
    private postService: PostService,
    private dataService: DataService,
    public dialog: MatDialog,
    public commentservice: CommentService,
    private router:  Router

  ) { }

  ngOnInit() {
    this.postService.getComments(this.post.id).subscribe(data => {
      this.comments = data;
    });
    this.postService.getAll().subscribe(data => {
      this.posts = data;
    });
  }

  refresh() {
    this.postService.getComments(this.post.id).subscribe(data => {
      this.comments = data;
    });

    }
  deleteComment(comment: Comment) {
    this.commentservice.deleteComment(comment);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { message: 'are you sure you want to delete this comment ?', entity: comment, type: 'comment' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  AddComment(postid: number) {
    this.dataService.postid = postid;
    const dialogRef = this.dialog.open(CommentformComponent, {
      data: { action: 'add' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

   editComment(postid: number, commentid: number, comment: Comment) {
    this.dataService.postid = postid;
    this.dataService.commentid = comment.id;
    const dialogRef = this.dialog.open(CommentformComponent,  {
      data: { name: comment.name,  email: comment.email,  body: comment.body, action: 'edit'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
}
