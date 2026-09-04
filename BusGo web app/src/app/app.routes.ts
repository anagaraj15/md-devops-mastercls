import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { BusesComponent } from './pages/buses/buses.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BookingConfirmationComponent } from './pages/booking-confirmation/booking-confirmation.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'buses', component: BusesComponent, canActivate: [authGuard] },
  { path: 'seats', component: SeatsComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'booking-confirmation', component: BookingConfirmationComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
