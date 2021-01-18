import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScoreType, TileScoreSplash } from '../../models/score';
import { ScoringService } from '../../services/scoring.service';

@Component({
  selector: 'app-game-board-splash',
  templateUrl: './game-board-splash.component.html',
  styleUrls: ['./game-board-splash.component.scss'],
})
export class GameBoardSplashComponent implements OnInit, OnDestroy {
  private subscription: Subject<boolean> = new Subject<boolean>();
  constructor(private scoringService: ScoringService) {}

  private readonly DECAY_TIME = 4000;

  public timeBonus?: number;
  public superTimeBonus?: number;
  public matchLengthBonus?: number;
  public hintLoss?: number;

  public splashItems: TileScoreSplash[] = [];

  public scoreType = ScoreType;

  ngOnInit(): void {
    this.scoringService.gameScoreState$
      .pipe(takeUntil(this.subscription))
      .subscribe((scoreSplash: TileScoreSplash) => {
        // remove expired elements
        this.splashItems = this.splashItems.filter(
          (item) =>
            item.timestamp && Date.now() - item.timestamp < this.DECAY_TIME
        );

        this.splashItems?.push(
          Object.assign({ timestamp: Date.now() }, scoreSplash)
        );
      });
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.complete();
  }
}
