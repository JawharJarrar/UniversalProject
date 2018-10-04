import { ConfirmComponent } from './../shared/components/confirm/confirm.component';
import { DataService } from './../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PostService } from '../shared/services/post.service';
import { PostformComponent } from '../shared/components/postform/postform.component';
import { Post } from '../shared/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  public  posts: Array<Post>;
  constructor(private postService: PostService,
                      private dataService: DataService,
                     public dialog: MatDialog) { }

  ngOnInit() {
    this.postService.getAll().subscribe(data => {
    this.posts = data;
    });
  }

  refresh() {
    this.postService.getAll().subscribe(data => {
      this.posts = data;
    });
  }
  UpdatePost(post: Post) {
    this.dataService.postid = post.id;
    const dialogRef = this.dialog.open(PostformComponent,  {
      data: { title: post.title,  body: post.body,  action: 'edit'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
  deletePost(post: Post) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { message: 'are you sure you want to remove this post', entity: post, type: 'post' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
  AddPost() {
    const dialogRef = this.dialog.open(PostformComponent,  {
      data: {  action: 'add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
}
