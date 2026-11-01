import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, expect, it, vi } from 'vitest';

import { AudioService } from './audio.service';
import { AudioDataList, AudioType } from './audio-data';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioService);
    for (const item of AudioDataList.list) {
      delete item.howl;
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should play cached Howl instance directly at rate 1 when useNote is false', () => {
    const rateSpy = vi.fn();
    const playSpy = vi.fn();
    const target = AudioDataList.list.find((a) => a.type === AudioType.Swipe)!;
    target.howl = { rate: rateSpy, play: playSpy } as any;

    service.PlayAudio(AudioType.Swipe, false);

    expect(rateSpy).toHaveBeenCalledWith(1);
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it('should escalate pitch rate when useNote is true and reset on SetMinNote', () => {
    const rates: number[] = [];
    const playSpy = vi.fn();
    const target = AudioDataList.list.find((a) => a.type === AudioType.TileRemove)!;
    target.howl = {
      rate: (r: number) => rates.push(r),
      play: playSpy,
    } as any;

    service.PlayAudio(AudioType.TileRemove, true);
    service.PlayAudio(AudioType.TileRemove, true);

    expect(rates.length).toBe(2);
    expect(rates[1]).toBeGreaterThan(rates[0]);

    service.SetMinNote();
    service.PlayAudio(AudioType.TileRemove, true);
    expect(rates[2]).toBeCloseTo(rates[0], 5);
  });

  it('should wrap note back to NOTE_MIN after exceeding NOTE_MAX', () => {
    const rates: number[] = [];
    const target = AudioDataList.list.find((a) => a.type === AudioType.TileRemove)!;
    target.howl = {
      rate: (r: number) => rates.push(r),
      play: vi.fn(),
    } as any;

    for (let i = 0; i < 25; i++) {
      service.PlayAudio(AudioType.TileRemove, true);
    }

    expect(rates.length).toBe(25);
    // NOTE_MIN=48, NOTE_MAX=71 -> 24th step hits 72 which wraps to 48
    expect(rates[23]).toBeCloseTo(Math.pow(2, (48 - 60) / 12), 5);
  });

  it('should instantiate a new Howl when target.howl is not yet cached', () => {
    const target = AudioDataList.list.find((a) => a.type === AudioType.Hint)!;
    expect(target.howl).toBeUndefined();

    service.PlayAudio(AudioType.Hint);

    expect(target.howl).toBeDefined();
  });
});
