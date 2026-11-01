import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { GameGestures, IPanEvent, ISwipeEvent, SwipeDirection } from './game-gestures';

describe('GameGestures', () => {
  let service: GameGestures;
  let element: HTMLElement;

  const dispatchPointer = (type: string, clientX: number, clientY: number) => {
    const event = new MouseEvent(type, { clientX, clientY, bubbles: true });
    element.dispatchEvent(event);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameGestures);
    element = document.createElement('div');
    service.registerElement(element);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit pan$ and swipe$ events for right, left, down, and up swipes >= minSwipeDistance', () => {
    const pans: IPanEvent[] = [];
    const swipes: ISwipeEvent[] = [];
    service.pan$.subscribe((e) => pans.push(e));
    service.swipe$.subscribe((e) => swipes.push(e));

    // Swipe Right
    dispatchPointer('pointerdown', 10, 10);
    dispatchPointer('pointermove', 50, 12);
    dispatchPointer('pointerup', 50, 12);

    // Swipe Left
    dispatchPointer('pointerdown', 100, 10);
    dispatchPointer('pointermove', 40, 12);
    dispatchPointer('pointerup', 40, 12);

    // Swipe Down
    dispatchPointer('pointerdown', 10, 10);
    dispatchPointer('pointermove', 12, 60);
    dispatchPointer('pointerup', 12, 60);

    // Swipe Up
    dispatchPointer('pointerdown', 10, 100);
    dispatchPointer('pointermove', 12, 40);
    dispatchPointer('pointerup', 12, 40);

    expect(swipes.map((s) => s.direction)).toEqual([
      SwipeDirection.Right,
      SwipeDirection.Left,
      SwipeDirection.Down,
      SwipeDirection.Up,
    ]);
    expect(pans.length).toBe(8);
  });

  it('should not emit swipe$ when movement is below minSwipeDistance (30px)', () => {
    const swipes: ISwipeEvent[] = [];
    service.swipe$.subscribe((e) => swipes.push(e));

    dispatchPointer('pointerdown', 10, 10);
    dispatchPointer('pointermove', 20, 10);
    dispatchPointer('pointerup', 20, 10);

    expect(swipes.length).toBe(0);
  });

  it('should emit a final null-direction pan event on pointercancel', () => {
    const pans: IPanEvent[] = [];
    service.pan$.subscribe((e) => pans.push(e));

    dispatchPointer('pointerdown', 10, 10);
    dispatchPointer('pointercancel', 15, 15);

    expect(pans.length).toBe(1);
    expect(pans[0].isFinal).toBe(true);
    expect(pans[0].direction).toBeNull();
  });

  it('should ignore pointermove and pointerup when pointer is not down', () => {
    const pans: IPanEvent[] = [];
    service.pan$.subscribe((e) => pans.push(e));

    dispatchPointer('pointermove', 100, 100);
    dispatchPointer('pointerup', 100, 100);
    dispatchPointer('pointercancel', 100, 100);

    expect(pans.length).toBe(0);
  });
});
