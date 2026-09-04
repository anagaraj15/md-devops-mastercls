import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  standalone: false,
})
export class RegisterComponent {
  error = "";
  success = "";

  form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password, confirmPassword } = this.form.getRawValue();

    if (password !== confirmPassword) {
      this.error = "Passwords do not match.";
      return;
    }

    const result = this.auth.register({
      name: name!,
      email: email!,
      password: password!,
    });

    if (!result.success) {
      this.error = result.message;
      return;
    }

    this.success = "Registration successful. Redirecting to login...";
    setTimeout(() => this.router.navigate(["/login"]), 900);
  }
}
