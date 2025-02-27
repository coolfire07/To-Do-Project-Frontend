import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: '../sign-in/sign-in.component.css'
})
export class RegistrationComponent {
  @ViewChild('usernameInput', { static: false }) usernameInput!: ElementRef;
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput', { static: false }) confirmPasswordInput!: ElementRef;
  registrationForm!: FormGroup;

  constructor(private readonly authService:AuthService, private readonly fb:FormBuilder, private readonly router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  toggleForm() {
    this.router.navigate(['/login']);
  }

  register(){
    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    const confirmPassword = this.confirmPasswordInput.nativeElement.value;

    this.authService.register(username, password, confirmPassword).subscribe(
      response => {
        this.router.navigate(['/login']);
      }
    );
  }
}
