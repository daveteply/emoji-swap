import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { AudioDataList, AudioType } from './audio-data';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly NOTE_MIN = 48;
  private readonly NOTE_MAX = 71;
  private _noteNext: number = this.NOTE_MIN;

  public SetMinNote(): void {
    this._noteNext = this.NOTE_MIN;
  }

  public PlayAudio(audioType: AudioType, useNote: boolean = false): void {
    const target = AudioDataList.list.find((a) => a.type === audioType);
    if (target) {
      if (target.howl) {
        this.playLoadedAudio(target.howl, useNote);
      } else {
        target.howl = new Howl({ src: target.url });
        target.howl.on('load', () => {
          if (target.howl) {
            this.playLoadedAudio(target.howl, useNote);
          }
        });
      }
    }
  }

  private get nextNote(): number {
    this._noteNext++;
    if (this._noteNext > this.NOTE_MAX) {
      this._noteNext = this.NOTE_MIN;
    }
    return Math.pow(2, (this._noteNext - 60) / 12);
  }

  private playLoadedAudio(target: Howl, useNote: boolean): void {
    target.rate(useNote ? this.nextNote : 1);
    target.play();
  }
}
