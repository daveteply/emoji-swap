import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum GameLoopSteps {
  LockBoard,
  FindMatches,
  RemoveMatchSet,
  ApplyScoring,
  UnlockBoard,
}

@Injectable({
  providedIn: 'root',
})
export class GameLoopService {
  private gameLoopStateSource = new Subject<GameLoopSteps>();

  public gameLoopState$ = this.gameLoopStateSource.asObservable();

  public DoStep(step: GameLoopSteps): void {
    this.gameLoopStateSource.next(step);
  }
}
