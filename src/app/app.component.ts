import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmNavComponent } from './components/confirm-nav/confirm-nav.component';
import { APP_TITLE } from './constants';

@Component({
  selector: 'ejw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isWeb: boolean = false;
  appTitle = APP_TITLE;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

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
