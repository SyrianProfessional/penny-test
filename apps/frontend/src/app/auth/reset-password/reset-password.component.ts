import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AntService } from '../../services/ant.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'penny-test-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private antService: AntService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });

    this.authService
      .checkResetPasswordToken(this.route.snapshot.params['token'])
      .subscribe(
        (data) => {
          // just check if the token i right and its not expired yet
        },
        (e) => {
          this.router.navigateByUrl('/auth/login');
        }
      );
  }

  validForm(controlName: string, errorName: string) {
    return (
      this.form.get(controlName)?.hasError(errorName) &&
      (this.form.get(controlName)?.dirty || this.form.get(controlName)?.touched)
    );
  }

  resetPassword() {
    this.loading = true;
    this.authService
      .resetPassword({
        token: this.route.snapshot.params['token'],
        password: this.form.value.password,
      })
      .subscribe(
        (data) => {
          this.antService.showMessage(data?.message, 'success');
          this.router.navigateByUrl('/auth/login');
          this.loading = false;
        },
        (e) => {
          this.loading = false;
        }
      );
  }
}
