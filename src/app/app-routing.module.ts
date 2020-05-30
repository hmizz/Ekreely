import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { postListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.comoponent';
import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { ProfileComponent } from './userPanel/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: RoomCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: RoomCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'rooms', component: RoomListComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
