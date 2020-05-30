import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatInputModule, MatInput } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatMenu, MatMenuModule } from '@angular/material/menu';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent} from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { postListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error/error-interceptor';
import { ErrorComponent} from './error/Error.Component';
import { HomeComponent } from './home/home.comoponent';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './footer/footer.component';
import { MyRoomsComponent } from './userPanel/my-rooms/my-rooms.component';
import { ProfileComponent } from './userPanel/profile/profile.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserAdminComponent } from './admin-panel/user-admin/user-admin.component';
import { RoomAdminComponent } from './admin-panel/room-admin/room-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
     HeaderComponent,
     postListComponent,
     LoginComponent,
     SignupComponent,
     ErrorComponent,
     HomeComponent,
     FooterComponent,
     MyRoomsComponent,
     ProfileComponent,
     RoomListComponent,
     RoomCreateComponent,
     AdminPanelComponent,
     UserAdminComponent,
     RoomAdminComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    // MatMenu,
    //  MatMenuModule,
    MatIconModule,
    LayoutModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }

