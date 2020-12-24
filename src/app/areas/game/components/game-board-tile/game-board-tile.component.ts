import { Component, Input } from '@angular/core';
import { GameTile } from '../../models/game-tile';
import { GameInteractionsService } from '../../services/game-interactions.service';

@Component({
  selector: 'app-game-board-tile',
  templateUrl: './game-board-tile.component.html',
  styleUrls: ['./game-board-tile.component.scss'],
})
export class GameBoardTileComponent {
  constructor(private gameInteractionsService: GameInteractionsService) {}

  @Input() tile!: GameTile;
  @Input() disabled!: boolean;

  onSwipe(event: any): void {
    this.gameInteractionsService.TileSwiped({
      tile: this.tile,
      direction: event?.direction,
    });
  }
}
