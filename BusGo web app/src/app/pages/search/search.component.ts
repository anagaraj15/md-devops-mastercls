import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BookingService } from "../../services/booking.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  standalone: false,
})
export class SearchComponent {
  minDate = new Date().toISOString().split("T")[0];

  form = this.fb.group({
    source: ["", Validators.required],
    destination: ["", Validators.required],
    date: [this.minDate, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private booking: BookingService,
    private auth: AuthService,
    private router: Router,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();

    if (data.source === data.destination) {
      this.form.controls.destination.setErrors({ same: true });
      return;
    }

    this.booking.setSearch({
      source: data.source!,
      destination: data.destination!,
      date: data.date!,
    });

    this.router.navigate(["/buses"]);
  }
}
