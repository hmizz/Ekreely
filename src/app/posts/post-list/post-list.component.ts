import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-List.Component.html',
  styleUrls: ['./post-list.component.css']
})

// tslint:disable-next-line: class-name
export  class postListComponent implements OnInit, OnDestroy {
  @ Input() post: Post[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;


  constructor(public postsService: PostsService, private authService: AuthService) {}
    ngOnInit() {
      this.isLoading = true;
      this.postsService.getPosts();
      this.userId = this.authService.getUserId();
      this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((post: Post[]) => {
        this.isLoading = false;
        this.post = post;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();


      });
  }

   onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
