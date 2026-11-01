import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { ConfirmNavComponent } from './components/confirm-nav/confirm-nav.component';
import { APP_TITLE } from './constants';

@Component({
  selector: 'ejw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class AppComponent {
  isWeb = true;
  appTitle = APP_TITLE;

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.unregisterStaleServiceWorkers();
  }

  private unregisterStaleServiceWorkers(): void {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        if (registrations.length > 0) {
          Promise.all(registrations.map((r) => r.unregister())).then(() => {
            if (typeof caches !== 'undefined') {
              caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
            }
          });
        }
      });
    }
  }

  navHome(): void {
    if (this.router.url === '/game') {
      const dialogRef = this.dialog.open(ConfirmNavComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
