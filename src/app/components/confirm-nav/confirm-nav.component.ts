import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ejw-confirm-nav',
  templateUrl: './confirm-nav.component.html',
  styleUrls: ['./confirm-nav.component.scss'],
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmNavComponent {}
