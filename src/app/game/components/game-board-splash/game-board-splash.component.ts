import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScoreType } from '../../models/score';
import { ScoringService } from '../../services/scoring.service';

@Component({
  selector: 'app-game-board-splash',
  templateUrl: './game-board-splash.component.html',
  styleUrls: ['./game-board-splash.component.scss'],
})
export class GameBoardSplashComponent implements OnInit, OnDestroy {
  private subscription: Subject<boolean> = new Subject<boolean>();
  constructor(private scoringService: ScoringService) {}

  public timeBonus?: number;
  public superTimeBonus?: number;
  public matchLengthBonus?: number;

  ngOnInit(): void {
    this.scoringService.gameScoreState$
      .pipe(takeUntil(this.subscription))
      .subscribe((scoreSplash) => {
        switch (scoreSplash.scoreType) {
          case ScoreType.Reset:
            this.timeBonus = 0;
            this.superTimeBonus = 0;
            this.matchLengthBonus = 0;
            break;

          case ScoreType.TimeBonus:
            this.timeBonus = scoreSplash.scoreValue;
            break;

          case ScoreType.SuperTimeBonus:
            this.superTimeBonus = scoreSplash.scoreValue;
            break;

          case ScoreType.MatchLengthBonus:
            this.matchLengthBonus = scoreSplash.scoreValue;
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.complete();
  }
}
