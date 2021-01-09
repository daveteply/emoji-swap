import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioContext } from 'angular-audio-context';

import { AudioDataList, AudioType } from './audio-date';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private audioContext: AudioContext) {
    // load context
    AudioDataList.list.forEach((audio) => {
      audio.track = this.audioContext.createMediaElementSource(audio.element);
      audio.track.connect(this.audioContext.destination);
    });
  }

  public async PlayAudio(audioType: AudioType): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const target = AudioDataList.list.find((a) => a.type === audioType);
    if (target) {
      target.element.currentTime = 0;
      target.element.play();
    }
  }

  public async beep(): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const oscillatorNode = this.audioContext.createOscillator();

    oscillatorNode.onended = () => oscillatorNode.disconnect();
    oscillatorNode.connect(this.audioContext.destination);

    oscillatorNode.start();
    oscillatorNode.stop(this.audioContext.currentTime + 0.5);
  }

  // public AudioLoaded(): Observable<boolean> {
  //   return new Observable((observer) => {
  //     let loadedCount = 0;
  //     const keyCount = Object.keys(this.audioData).length;
  //     const audioLoaded = () => {
  //       loadedCount++;
  //       if (loadedCount === keyCount) {
  //         observer.next();
  //         observer.complete();
  //       }
  //     };

  //     this.audioData.levelChange.oncanplaythrough = audioLoaded;
  //     this.audioData.tileRemove.oncanplaythrough = audioLoaded;
  //   });
  // }

  // public PlayAudio(soundType: SoundType): void {
  //   switch (soundType) {
  //     case SoundType.LevelChange:
  //       this.audioData.levelChange.currentTime = 0;
  //       this.audioData.levelChange.play();
  //       break;

  //     case SoundType.TileRemove:
  //       this.audioData.tileRemove.currentTime = 0;
  //       this.audioData.tileRemove.play();
  //       break;
  //   }
  // }
}
