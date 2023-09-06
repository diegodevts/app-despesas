import { Component, ElementRef, ViewChild } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  iconOf: boolean = true;

  set(): void {
    this.iconOf = !this.iconOf;
    this.iconOf
      ? (this.passwordInput.nativeElement.type = 'text')
      : (this.passwordInput.nativeElement.type = 'password');
  }
}
