import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  BookingService,
  Bus,
  SearchData,
} from "../../services/booking.service";

interface Seat {
  number: string;
  booked: boolean;
}

@Component({
  selector: "app-seats",
  templateUrl: "./seats.component.html",
  standalone: false,
})
export class SeatsComponent implements OnInit {
  bus: Bus | null = null;
  search: SearchData | null = null;
  seats: Seat[] = [];
  selectedSeats: string[] = [];

  constructor(
    private booking: BookingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.bus = this.booking.getBus();
    this.search = this.booking.getSearch();

    if (!this.bus || !this.search) {
      this.router.navigate(["/search"]);
      return;
    }

    const bookedNumbers = new Set([
      "A2",
      "A4",
      "B1",
      "B4",
      "C3",
      "D2",
      "D4",
      "E1",
      "F3",
    ]);
    const all: Seat[] = [];

    for (let row = 0; row < 6; row++) {
      const letter = String.fromCharCode(65 + row);
      for (let col = 1; col <= 4; col++) {
        all.push({
          number: `${letter}${col}`,
          booked: bookedNumbers.has(`${letter}${col}`),
        });
      }
    }

    this.seats = all;
  }

  toggleSeat(seat: Seat): void {
    if (seat.booked) return;

    const index = this.selectedSeats.indexOf(seat.number);

    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
      return;
    }

    if (this.selectedSeats.length >= 6) return;

    this.selectedSeats.push(seat.number);
  }

  isSelected(number: string): boolean {
    return this.selectedSeats.includes(number);
  }

  continueToPayment(): void {
    if (!this.selectedSeats.length) return;

    this.booking.setSeats(this.selectedSeats);
    this.router.navigate(["/payment"]);
  }

  total(): number {
    return (this.bus?.price ?? 0) * this.selectedSeats.length;
  }
}
