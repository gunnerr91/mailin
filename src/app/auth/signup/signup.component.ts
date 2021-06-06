import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CheckUsername } from '../validators/check-username';
import { MatchPassword } from '../validators/match-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.checkUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private matchPassword: MatchPassword,
    private checkUsername: CheckUsername,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  showOverallErrors() {
    return (
      this.authForm.get('password')?.touched &&
      this.authForm.get('passwordConfirmation')?.touched &&
      this.authForm.errors
    );
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: (response) => {
        console.log(this);
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({
            noConnection: true,
          });
        }
        this.authForm.setErrors({
          unknownErrors: true,
        });
      },
    });
  }
}
