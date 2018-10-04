import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommentService } from './shared/services/comment.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { PostService } from './shared/services/post.service';
import { UserService } from './shared/services/user.service';
import { ComponentsModule } from './shared/components/components.module';
import { MaterialModule } from './shared/components/material';
import { AppRoutingModule } from './app-routing.module';
/**
 *
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
     PostsListComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    LayoutModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
  ],
  exports: [
    AppComponent,
    UserListComponent,
    PostsListComponent,
    LoginComponent,
    SignupComponent,
    RouterModule,
  ],
  providers: [UserService, PostService, AuthGuardService, CommentService],
  bootstrap: [AppComponent],
})

export class AppModule {
}
