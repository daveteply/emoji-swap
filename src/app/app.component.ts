import { Component, OnInit } from '@angular/core';
import { AudioService } from './services/audio.service';
import { Device } from '@capacitor/device';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmNavComponent } from './components/confirm-nav/confirm-nav.component';

@Component({
  selector: 'ejw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  soundEnabled: boolean = true;
  showAudio: boolean = false;
  appIcon = String.fromCodePoint(0x1f63a);

  constructor(private audioService: AudioService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    // device info
    Device.getInfo().then((deviceInfo) => {
      this.showAudio = deviceInfo.platform === 'web';
    });
  }

  public ToggleAudio(): void {
    this.soundEnabled = !this.soundEnabled;
    this.audioService.Gain = this.soundEnabled ? 1 : 0;
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
