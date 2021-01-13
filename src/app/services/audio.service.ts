import { Injectable } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
import { AudioDataList, AudioType } from './audio-data';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private gainNode: any;

  constructor(private audioContext: AudioContext) {
    // gain
    this.gainNode = this.audioContext.createGain();
    // load context
    AudioDataList.list.forEach((audio) => {
      audio.track = this.audioContext.createMediaElementSource(audio.element);
      audio.track.connect(this.gainNode).connect(this.audioContext.destination);
    });
  }

  set Gain(gainValue: number) {
    this.gainNode.gain.value = gainValue;
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
}
