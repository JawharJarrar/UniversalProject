import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { CommentService } from './../../services/comment.service';
import { PostService } from './../../services/post.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent  implements OnInit {
  public confirmMessage: string = this.data.message ;
  public type: string = this.data.type;
  public user: User = this.data.entity;
  public post: Post = this.data.entity;
  public comment: Comment = this.data.entity;

  constructor(
    private userservice: UserService,
    private postservice: PostService,
    private commentservice: CommentService,


    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmComponent>
  ) {}

  ngOnInit() {}

  public  onNoClick() {
    this.dialogRef.close();
  }

  public accept() {
    if (this.data.type === 'user') {
      this.userservice.deleteUser(this.user);
    }
     if (this.data.type === 'post') {
      this.postservice.deletePost(this.post);
    }
    if (this.data.type === 'comment') {
      this.commentservice.deleteComment(this.comment);
    }
this.dialogRef.close();
 }
}
