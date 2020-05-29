import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { verifyHostBindings } from '@angular/compiler';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  // connect the service method to the login component
  constructor(public authService: AuthService, private elementRef: ElementRef) {}
  ngOnInit() {
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
     authStatus => {
       this.isLoading = false;
      }
    );
   }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(
      form.value.namee,
       form.value.phoneNumbe,
       form.value.email,
        form.value.password);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5F5F5' ;
 }
}
