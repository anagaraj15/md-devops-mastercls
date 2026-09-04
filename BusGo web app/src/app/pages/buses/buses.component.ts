import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  BookingService,
  Bus,
  SearchData,
} from "../../services/booking.service";

@Component({
  selector: "app-buses",
  templateUrl: "./buses.component.html",
  standalone: false,
})
export class BusesComponent implements OnInit {
  buses: Bus[] = [];
  search: SearchData | null = null;

  constructor(
    private booking: BookingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.search = this.booking.getSearch();

    if (!this.search) {
      this.router.navigate(["/search"]);
      return;
    }

    this.buses = this.booking.getBuses();
  }

  selectBus(bus: Bus): void {
    this.booking.setBus(bus);
    this.router.navigate(["/seats"]);
  }
}
