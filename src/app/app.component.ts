import { Component, OnInit } from '@angular/core';
import { AudioService } from './services/audio.service';
import { Device } from '@capacitor/device';

@Component({
  selector: 'ejw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  soundEnabled: boolean = true;
  showAudio: boolean = false;
  appIcon = String.fromCodePoint(0x1f63a);

  constructor(private audioService: AudioService) {}

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
}
