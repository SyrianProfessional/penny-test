import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { AntService } from '../../services/ant.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'penny-test-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private antService: AntService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, CustomValidators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  validForm(controlName: string, errorName: string) {
    return (
      this.form.get(controlName)?.hasError(errorName) &&
      (this.form.get(controlName)?.dirty || this.form.get(controlName)?.touched)
    );
  }

  signup() {
    this.loading = true;
    this.authService.signup(this.form.value).subscribe(
      (data) => {
        this.loading = false;
        this.antService.showMessage(data?.message, 'success');
        this.router.navigateByUrl('/users/users-list');
      },
      (e) => {
        this.loading = false;
      }
    );
  }
}
