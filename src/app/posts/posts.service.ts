import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

getPosts() {
this.http.get<{message: string, posts: any}>(
  'http://localhost:3000/api/posts')
  .pipe(map((postData) => {
  return postData.posts.map(post => {
    return {
      title: post.title,
      content: post.content,
      id: post._id,
      creator: post.creator
    };
  });
  }))
.subscribe(transformedPosts => {
  this.posts = transformedPosts;
  this.postsUpdated.next([...this.posts]);

   });

 }

 getPostUpdateListener() {
   return this.postsUpdated.asObservable();
 }
getPost(id: string) {
  return this.http.get<{_id: string, title: string, content: string, creator: string}>(
    'http://localhost:3000/api/posts/' + id);

}

 addPost(title: string, content: string, creator: null ) {
   const post: Post = {id: null, title, content, creator};
   this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
   .subscribe( (ResponseData) => {
     const id = ResponseData.postId;
     post.id = id;
     this.posts.push(post);
     this.postsUpdated.next([...this.posts]);
     this.router.navigate(['/']);
     // ('/')
   });
 }
 updatePost(id: string, title: string, content: string, creator= null) {
  const post: Post = { id, title, content, creator };
  this.http
  .put('http://localhost:3000/api/posts/' + id, post)
  .subscribe(response => {
    const updatedPosts = [...this.posts];
    const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
    updatedPosts[oldPostIndex] = post;
    this.posts = updatedPosts;
    this.postsUpdated.next([...this.posts]);
    this.router.navigate(['/']);
    // ('/')

   });

 }
  deletePost(postId: string) {
   this.http.delete('http://localhost:3000/api/posts/' + postId)
     .subscribe(() => {
       const updatedPosts = this.posts.filter(post => post.id !== postId);
       this.posts = updatedPosts;
       this.postsUpdated.next([...this.posts]);
   });
  }
}
