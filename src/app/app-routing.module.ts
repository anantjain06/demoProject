import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-student.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-post' },
  { path: 'add-post', component: AddPostComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: 'posts-list', component: PostsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }