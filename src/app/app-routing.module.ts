import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { ProfileComponent } from './userPanel/profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MyRoomsComponent } from './userPanel/my-rooms/my-rooms.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: RoomCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: RoomCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'rooms', component: RoomListComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin', component: AdminPanelComponent},
  { path: 'myrooms', component: MyRoomsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
