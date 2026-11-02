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
  private activeElement: HTMLElement | null = null;
  private registeredElements = new WeakSet<HTMLElement>();

  private readonly onWindowPointerEnd = (event: PointerEvent): void => {
    if (this.isPointerDown && this.activeElement) {
      this.onPointerUp(event, this.activeElement);
    }
  };

  public registerElement(element: HTMLElement): void {
    if (this.registeredElements.has(element)) {
      return;
    }
    this.registeredElements.add(element);

    element.addEventListener('pointerdown', (e) => this.onPointerDown(e, element));
    element.addEventListener('pointermove', (e) => this.onPointerMove(e, element));
    element.addEventListener('pointerup', (e) => this.onPointerUp(e, element));
    element.addEventListener('pointercancel', (e) => this.onPointerCancel(e, element));
  }

  private onPointerDown(event: PointerEvent, element: HTMLElement): void {
    // If a previous gesture never received pointerup, finalize it cleanly first
    if (this.isPointerDown && this.activeElement) {
      this.panSubject.next({
        direction: null,
        deltaX: 0,
        deltaY: 0,
        isFinal: true,
        element: this.activeElement,
      });
    }

    this.isPointerDown = true;
    this.activeElement = element;
    this.touchStartX = event.clientX;
    this.touchStartY = event.clientY;

    if (typeof element.setPointerCapture === 'function' && event.pointerId !== undefined) {
      try {
        element.setPointerCapture(event.pointerId);
      } catch {
        // Ignore capture errors on synthetic events
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('pointerup', this.onWindowPointerEnd, { once: true });
      window.addEventListener('pointercancel', this.onWindowPointerEnd, { once: true });
    }
  }

  private onPointerMove(event: PointerEvent, element: HTMLElement): void {
    if (!this.isPointerDown) return;
    const targetElement = this.activeElement || element;

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
        element: targetElement,
      });
    }
  }

  private onPointerUp(event: PointerEvent, element: HTMLElement): void {
    if (!this.isPointerDown) return;
    const targetElement = this.activeElement || element;
    this.cleanupPointerState(event, targetElement);

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
      element: targetElement,
    });

    // Only register as swipe if movement is greater than minimum distance
    if (absDeltaX < this.minSwipeDistance && absDeltaY < this.minSwipeDistance) {
      return;
    }

    if (direction) {
      this.swipeSubject.next({ direction, element: targetElement });
    }
  }

  private onPointerCancel(event: PointerEvent, element: HTMLElement): void {
    if (!this.isPointerDown) return;
    const targetElement = this.activeElement || element;
    this.cleanupPointerState(event, targetElement);

    const deltaX = event.clientX - this.touchStartX;
    const deltaY = event.clientY - this.touchStartY;

    this.panSubject.next({
      direction: null,
      deltaX,
      deltaY,
      isFinal: true,
      element: targetElement,
    });
  }

  private cleanupPointerState(event: PointerEvent, element: HTMLElement): void {
    this.isPointerDown = false;
    this.activeElement = null;

    if (typeof element.releasePointerCapture === 'function' && event.pointerId !== undefined) {
      try {
        if (element.hasPointerCapture?.(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Ignore release errors
      }
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerup', this.onWindowPointerEnd);
      window.removeEventListener('pointercancel', this.onWindowPointerEnd);
    }
  }
}
