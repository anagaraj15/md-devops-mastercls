import { Injectable } from '@angular/core';

export interface Bus {
  id: number;
  operator: string;
  type: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  rating: number;
}

export interface SearchData {
  source: string;
  destination: string;
  date: string;
}

export interface Booking {
  bookingId: string;
  passengerName: string;
  email: string;
  source: string;
  destination: string;
  date: string;
  bus: Bus;
  seats: string[];
  paymentMethod: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private searchData: SearchData | null = null;
  private selectedBus: Bus | null = null;
  private selectedSeats: string[] = [];
  private booking: Booking | null = null;

  private buses: Bus[] = [
    {
      id: 1, operator: 'GoBus Express', type: 'AC Sleeper',
      departure: '06:30 AM', arrival: '12:30 PM', duration: '6h',
      price: 699, rating: 4.6
    },
    {
      id: 2, operator: 'CityLine Travels', type: 'AC Seater',
      departure: '08:00 AM', arrival: '02:45 PM', duration: '6h 45m',
      price: 549, rating: 4.4
    },
    {
      id: 3, operator: 'Royal Roadways', type: 'Volvo Multi-Axle',
      departure: '09:30 AM', arrival: '04:00 PM', duration: '6h 30m',
      price: 899, rating: 4.8
    },
    {
      id: 4, operator: 'Comfort Bus', type: 'Non-AC Seater',
      departure: '10:45 PM', arrival: '05:30 AM', duration: '6h 45m',
      price: 449, rating: 4.2
    }
  ];

  setSearch(data: SearchData): void { this.searchData = data; }
  getSearch(): SearchData | null { return this.searchData; }

  getBuses(): Bus[] { return this.buses; }

  setBus(bus: Bus): void {
    this.selectedBus = bus;
    this.selectedSeats = [];
  }

  getBus(): Bus | null { return this.selectedBus; }

  setSeats(seats: string[]): void { this.selectedSeats = seats; }
  getSeats(): string[] { return this.selectedSeats; }

  createBooking(paymentMethod: string, user: { name: string; email: string }): Booking {
    if (!this.searchData || !this.selectedBus || !this.selectedSeats.length) {
      throw new Error('Booking information is incomplete.');
    }

    this.booking = {
      bookingId: 'BG' + Date.now().toString().slice(-8),
      passengerName: user.name,
      email: user.email,
      source: this.searchData.source,
      destination: this.searchData.destination,
      date: this.searchData.date,
      bus: this.selectedBus,
      seats: [...this.selectedSeats],
      paymentMethod,
      total: this.selectedSeats.length * this.selectedBus.price
    };

    return this.booking;
  }

  getBooking(): Booking | null { return this.booking; }
}
