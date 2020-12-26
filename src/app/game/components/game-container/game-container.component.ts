import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit {
  score = 0;
  level = 1;

  ngOnInit(): void {}

  updateScore(newScore: number): void {
    this.score = newScore;
  }
}
