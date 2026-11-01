import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameBoardSplashComponent } from '../game-board-splash/game-board-splash.component';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, GameBoardComponent, GameBoardSplashComponent],
})
export class GameContainerComponent implements OnInit {
  score = 0;
  level = 1;

  ngOnInit(): void {}

  updateScore(newScore: number): void {
    this.score = newScore;
  }

  updateLevel(newLevel: number): void {
    this.level = newLevel;
  }
}
