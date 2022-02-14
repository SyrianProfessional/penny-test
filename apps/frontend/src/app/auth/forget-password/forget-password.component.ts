import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { AntService } from '../../services/ant.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'penny-test-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private antService: AntService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('ashraf@gmail.com', [
        Validators.required,
        CustomValidators.email,
      ]),
    });
  }

  validForm(controlName: string, errorName: string) {
    return (
      this.form.get(controlName)?.hasError(errorName) &&
      (this.form.get(controlName)?.dirty || this.form.get(controlName)?.touched)
    );
  }

  forgetPassword() {
    this.loading = true;
    this.authService.forgetPassword(this.form.value.email).subscribe(
      (data) => {
        this.antService.showMessage(data?.message, 'success');
        this.router.navigateByUrl("/auth/login")
      },
      (e) => {},
      () => {
        this.loading = false;
      }
    );
  }
}
