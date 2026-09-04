import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Booking, BookingService } from "../../services/booking.service";

@Component({
  selector: "app-booking-confirmation",
  templateUrl: "./booking-confirmation.component.html",
  standalone: false,
})
export class BookingConfirmationComponent implements OnInit {
  booking: Booking | null = null;

  constructor(
    private bookingService: BookingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.booking = this.bookingService.getBooking();

    if (!this.booking) {
      this.router.navigate(["/search"]);
    }
  }

  bookAnother(): void {
    this.router.navigate(["/search"]);
  }
}
