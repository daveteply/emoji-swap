import { Component } from '@angular/core';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  soundEnabled = true;
  constructor(private audioService: AudioService) {}

  public ToggleAudio(): void {
    this.soundEnabled = !this.soundEnabled;
    this.audioService.Gain = this.soundEnabled ? 1 : 0;
  }
}
