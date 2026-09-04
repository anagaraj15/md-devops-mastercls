import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  BookingService,
  Bus,
  SearchData,
} from "../../services/booking.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  standalone: false,
})
export class PaymentComponent implements OnInit {
  bus: Bus | null = null;
  search: SearchData | null = null;
  seats: string[] = [];
  method = "UPI";
  processing = false;

  constructor(
    private booking: BookingService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.bus = this.booking.getBus();
    this.search = this.booking.getSearch();
    this.seats = this.booking.getSeats();

    if (!this.bus || !this.search || !this.seats.length) {
      this.router.navigate(["/search"]);
    }
  }

  total(): number {
    return this.seats.length * (this.bus?.price ?? 0);
  }

  pay(): void {
    const user = this.auth.getCurrentUser();

    if (!user || !this.bus || !this.search || !this.seats.length) return;

    this.processing = true;

    setTimeout(() => {
      this.booking.createBooking(this.method, user);
      this.router.navigate(["/booking-confirmation"]);
    }, 1200);
  }
}
