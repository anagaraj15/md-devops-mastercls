import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-navbar></app-navbar>
    <main class="page-shell">
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: false,
})
export class AppComponent {}
