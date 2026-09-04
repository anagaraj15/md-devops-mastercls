import { Injectable } from '@angular/core';

export interface AppUser {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'busgo_users';
  private loggedInKey = 'busgo_logged_in_user';

  register(user: AppUser): { success: boolean; message: string } {
    const users = this.getUsers();

    if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return { success: true, message: 'Registration successful.' };
  }

  login(email: string, password: string): boolean {
    const user = this.getUsers().find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) return false;

    localStorage.setItem(this.loggedInKey, JSON.stringify({
      name: user.name,
      email: user.email
    }));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.loggedInKey);
  }

  getCurrentUser(): { name: string; email: string } | null {
    const value = localStorage.getItem(this.loggedInKey);
    return value ? JSON.parse(value) : null;
  }

  private getUsers(): AppUser[] {
    const value = localStorage.getItem(this.usersKey);
    return value ? JSON.parse(value) : [];
  }
}
