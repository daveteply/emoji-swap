import { Injectable } from '@angular/core';
import { AudioDataList, AudioType } from './audio-data';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private gainNode: any;

  constructor() {
    // gain
    // this.gainNode = this.audioContext.createGain();
    // load context
    // AudioDataList.list.forEach((audio) => {
    //   audio.track = this.audioContext.createMediaElementSource(audio.element);
    //   audio.track.connect(this.gainNode).connect(this.audioContext.destination);
    // });
  }

  set Gain(gainValue: number) {
    this.gainNode.gain.value = gainValue;
  }

  public async PlayAudio(audioType: AudioType): Promise<void> {
    // if (this.audioContext.state === 'suspended') {
    //   await this.audioContext.resume();
    // }

    const target = AudioDataList.list.find((a) => a.type === audioType);
    if (target) {
      target.element.currentTime = 0;
      target.element.play();
    }
  }
}
