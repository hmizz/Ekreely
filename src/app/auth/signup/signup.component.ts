import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService, private elementRef: ElementRef) {}
   ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }


  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // tslint:disable-next-line: deprecation
    this.authService.createUser(form.value.fullName,
      form.value.phoneNumber,
      form.value.email,
       form.value.password);
    // this.router.navigate(['/login']);
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5F5F5' ;
 }
}
