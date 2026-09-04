# BusGo - Angular 19 Bus Seat Booking

A responsive bus seat booking demo built with Angular 19 using the classic NgModule architecture (NOT standalone components) and Bootstrap 5.

## Features
- Login and registration
- LocalStorage-based demo authentication
- Route/source/destination/date search
- Bus listing with timings, operator, rating and fare
- Interactive 4-column seat layout
- Booked/available/selected seat states
- Maximum 6 seats per booking
- Dummy UPI/Card/Net Banking payment
- Booking confirmation/ticket
- Route guard for authenticated pages
- Responsive Bootstrap UI

## Run
1. Install Node.js 20+.
2. Open this folder in VS Code.
3. Run:
   npm install
4. Start:
   npm start
5. Open the URL shown by Angular CLI (normally http://localhost:4200).

## Important
This is a frontend demo. User credentials, users, booking state and authentication are stored in browser LocalStorage. No real payment gateway or backend database is connected.

## Module architecture
The application uses:
- AppModule
- declarations for all components
- RouterModule.forRoot(...)
- ReactiveFormsModule
- `standalone: false` component generation configuration
