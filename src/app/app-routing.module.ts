import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list/posts-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'posts/list', component: PostsListComponent, canActivate: [AuthGuardService] },
  { path: 'user/list', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

/**
 * Main module routig
 *
 * Link to about module with lazy-loading, and instead to home component
 */
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
