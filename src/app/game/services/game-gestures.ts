import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum SwipeDirection {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down',
}

export interface IPanEvent {
  direction: SwipeDirection | null;
  deltaX: number;
  deltaY: number;
  isFinal: boolean;
  element: HTMLElement;
}

export interface ISwipeEvent {
  direction: SwipeDirection;
  element: HTMLElement;
}

@Injectable({
  providedIn: 'root',
})
export class GameGestures {
  private panSubject = new Subject<IPanEvent>();
  public pan$ = this.panSubject.asObservable();

  private swipeSubject = new Subject<ISwipeEvent>();
  public swipe$ = this.swipeSubject.asObservable();

  private touchStartX = 0;
  private touchStartY = 0;
  private minSwipeDistance = 30; // minimum distance to register as swipe
  private isPointerDown = false;

  public registerElement(element: HTMLElement): void {
    element.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    element.addEventListener('pointermove', (e) => this.onPointerMove(e, element));
    element.addEventListener('pointerup', (e) => this.onPointerUp(e, element));
    element.addEventListener('pointercancel', (e) => this.onPointerCancel(e, element));
  }

  private onPointerDown(event: PointerEvent): void {
    this.isPointerDown = true;
    this.touchStartX = event.clientX;
    this.touchStartY = event.clientY;
  }

  private onPointerMove(event: PointerEvent, element: HTMLElement): void {
    if (!this.isPointerDown) return;

    const deltaX = event.clientX - this.touchStartX;
    const deltaY = event.clientY - this.touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Only emit pan events if there's meaningful movement
    if (absDeltaX > 5 || absDeltaY > 5) {
      let direction: SwipeDirection | null = null;

      // Determine direction based on which axis has more movement
      if (absDeltaX > absDeltaY) {
        direction = deltaX > 0 ? SwipeDirection.Right : SwipeDirection.Left;
      } else if (absDeltaY > absDeltaX) {
        direction = deltaY > 0 ? SwipeDirection.Down : SwipeDirection.Up;
      }

      this.panSubject.next({
        direction,
        deltaX,
        deltaY,
        isFinal: false,
        element,
      });
    }
  }

  private onPointerUp(event: PointerEvent, element: HTMLElement): void {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;

    const deltaX = event.clientX - this.touchStartX;
    const deltaY = event.clientY - this.touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Emit final pan event
    let direction: SwipeDirection | null = null;
    if (absDeltaX > absDeltaY) {
      direction = deltaX > 0 ? SwipeDirection.Right : SwipeDirection.Left;
    } else if (absDeltaY > absDeltaX) {
      direction = deltaY > 0 ? SwipeDirection.Down : SwipeDirection.Up;
    }

    this.panSubject.next({
      direction,
      deltaX,
      deltaY,
      isFinal: true,
      element,
    });

    // Only register as swipe if movement is greater than minimum distance
    if (absDeltaX < this.minSwipeDistance && absDeltaY < this.minSwipeDistance) {
      return;
    }

    if (direction) {
      this.swipeSubject.next({ direction, element });
    }
  }

  private onPointerCancel(event: PointerEvent, element: HTMLElement): void {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;

    const deltaX = event.clientX - this.touchStartX;
    const deltaY = event.clientY - this.touchStartY;

    this.panSubject.next({
      direction: null,
      deltaX,
      deltaY,
      isFinal: true,
      element,
    });
  }
}
