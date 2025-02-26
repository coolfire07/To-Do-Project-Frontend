import { Component, EventEmitter, Output, ViewChild, ElementRef  } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  @ViewChild('usernameInput', { static: false }) usernameInput!: ElementRef;
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef;
  loginForm!: FormGroup;

  @Output() loginSuccess: EventEmitter<void> = new EventEmitter();

  constructor(private readonly authService: AuthService, private readonly fb: FormBuilder, private readonly router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    this.authService.login(username, password).subscribe(
      response => {
        const token = response.token;
        localStorage.setItem('jwt-token', token);
        this.router.navigate(['/tasks']).then(success => {
          if (success) {
            this.loginSuccess.emit();
          }
        });
      }
    );
  }

  @Output() toggle: EventEmitter<void> = new EventEmitter();

  toggleForm() {
    this.router.navigate(['/register']).then(success => {
      if (success) {
        this.toggle.emit();
      }
    });
  }
}
