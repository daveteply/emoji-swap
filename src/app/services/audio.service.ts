import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum SoundType {
  LevelChange,
  TileRemove,
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly ASSET_PATH = '/assets/wav/';

  private readonly audioData = {
    levelChange: new Audio(
      `${this.ASSET_PATH}mixkit-fast-sweeping-transition-164.wav`
    ),
    tileRemove: new Audio(
      `${this.ASSET_PATH}mixkit-quick-swoosh-accent-1464.wav`
    ),
  };

  public AudioLoaded(): Observable<boolean> {
    return new Observable((observer) => {
      let loadedCount = 0;
      const keyCount = Object.keys(this.audioData).length;
      const audioLoaded = () => {
        loadedCount++;
        if (loadedCount === keyCount) {
          observer.next();
          observer.complete();
        }
      };

      this.audioData.levelChange.oncanplaythrough = audioLoaded;
      this.audioData.tileRemove.oncanplaythrough = audioLoaded;
    });
  }

  public PlayAudio(soundType: SoundType): void {
    switch (soundType) {
      case SoundType.LevelChange:
        this.audioData.levelChange.currentTime = 0;
        this.audioData.levelChange.play();
        break;

      case SoundType.TileRemove:
        this.audioData.tileRemove.currentTime = 0;
        this.audioData.tileRemove.play();
        break;
    }
  }
}
